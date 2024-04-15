import { Injectable } from '@nestjs/common';
import { Chat, User } from 'db/entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ChatRepository extends Repository<Chat> {
  constructor(private readonly dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }
  async createChat(userId: number, chat: Partial<Chat>) {
    const isChat = await this.findOneByOrFail({ chat_name: chat.chat_name });
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    // TODO add logic for chat_name repetition
    if (isChat) return new Error();
    return await this.save({ ...chat, created_by: user });
  }
  async getChat(id: number) {
    const chat = await this.findOne({
      where: { id },
      relations: ['created_by', 'members', 'messages'],
    });
    if (!chat) return new Error();
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
