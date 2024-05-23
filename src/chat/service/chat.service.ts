import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRepository } from 'src/common/repository/chat.repository';
import { CreateChatDto } from 'src/common/schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  async createChat(userId: number, chat: CreateChatDto) {
    try {
      return await this.chatRepository.createChat(userId, chat);
    } catch (error) {
      return error;
    }
  }
  async getChat(id: number) {
    try {
      return await this.chatRepository.getChat(id);
    } catch (error) {
      return error;
    }
  }
  async deleteChat(userId: number, chatId: number) {
    try {
      return await this.chatRepository.deleteChat(userId, chatId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
