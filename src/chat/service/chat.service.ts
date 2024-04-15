import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChatRepository } from 'src/common/repository/chat.repository';
import { CreateChatDto, UpdateChatDto } from 'src/common/schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  async createChat(userId: number, chat: CreateChatDto) {
    try {
      const chatData = { ...chat, created_at: Date.now().toString() };

      return await this.chatRepository.createChat(userId, chatData);
    } catch (error) {
      throw new ConflictException();
    }
  }
  async getChat(id: number) {
    try {
      return await this.chatRepository.getChat(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async updateChat(userId: number, chatId: number, chat: UpdateChatDto) {
    try {
      return await this.chatRepository.updateChat(userId, chatId, chat);
    } catch (error) {
      throw new NotFoundException();
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
