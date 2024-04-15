import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepository } from 'src/common/repository/message.repository';
import {
  CreateMessageDto,
  UpdateMessageDto,
} from 'src/common/schema/message.schema';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async createMessage(userId: number, message: CreateMessageDto) {
    try {
      const { chat_id, ...rest } = message;
      return await this.messageRepository.createMessage(userId, chat_id, rest);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateMessage(
    userId: number,
    messageId: number,
    message: UpdateMessageDto,
  ) {
    try {
      return await this.messageRepository.updateMessage(
        userId,
        messageId,
        message,
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async deleteMessage(messageId: number, userId: number) {
    try {
      return await this.messageRepository.deleteMessage(messageId, userId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async getAllMessages(chatId: number, page: number = 1) {
    try {
      const limit = 15;
      return await this.messageRepository.getAllMessages(chatId, page, limit);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
