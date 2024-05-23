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
    if (chat.members.length > 2) {
      newChat.chat_name = chat.chat_name;
      newChat.type = 'group';
    } else {
      newChat.chat_name = [user.username, memberEntities[0].username];
      newChat.type = 'private';
    }
    newChat.members = [...memberEntities, user];
    return await this.save(newChat);
  }

  async getChat(id: number) {
    const chat = await this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.members', 'members')
      .leftJoinAndSelect('chat.messages', 'messages')
      .leftJoinAndSelect('messages.user', 'messageUser')
      .leftJoinAndSelect('chat.created_by', 'createdBy')
      .where('chat.id = :id', { id })
      .getOne();

    if (!chat) throw new NotFoundException('Chat with that id not found');
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
