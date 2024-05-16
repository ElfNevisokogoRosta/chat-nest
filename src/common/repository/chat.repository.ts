import { Injectable, NotFoundException } from '@nestjs/common';
import { Chat, User } from 'db/entity';
import { Repository, DataSource } from 'typeorm';
import { CreateChatDto } from '../schema/chat.schema';

@Injectable()
export class ChatRepository extends Repository<Chat> {
  constructor(private readonly dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }
  async createChat(userId: number, chat: CreateChatDto) {
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const newChat = new Chat();
    newChat.chat_name = chat.chat_name;
    newChat.created_at = chat.created_at;
    newChat.archived = false;
    newChat.created_by = user;

    const memberEntities = await Promise.all(
      chat.members.map(async (memberId) => {
        const member = await this.dataSource.manager.findOne(User, {
          where: { id: memberId },
        });
        if (!member)
          throw new NotFoundException(`Member with ID ${memberId} not found`);
        return member;
      }),
    );
    newChat.members = memberEntities;
    return await this.save(newChat);
  }
  async getChat(id: number) {
    const chat = await this.findOne({
      where: { id },
      relations: ['members', 'messages', 'created_by'],
    });
    if (!chat) return new NotFoundException('Chat with that id not foudn');
    return chat;
  }
  async updateChat(userId: number, chatId: number, chat: Partial<Chat>) {
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    const isChat = await this.findOneByOrFail({ id: chatId });
    if (!(isChat.created_by.id === user.id)) return new Error();
    if (!isChat) return new Error();
    return await this.update(chatId, chat);
  }

  async deleteChat(userId: number, chatId: number) {
    const isChat = await this.findOneByOrFail({ id: chatId });
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!(isChat.created_by.id === user.id)) return new Error();
    if (!isChat) return new Error();
    return await this.delete(chatId);
  }
}
