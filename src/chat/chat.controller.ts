import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { CreateChatDto, UpdateChatDto } from 'src/common/schema/chat.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() chat: CreateChatDto) {
    return await this.chatService.createChat(1, chat);
  }

  @Get(':id')
  async getChatInfo(@Param() chatId: string) {
    return await this.chatService.getChat(+chatId);
  }
  @Patch(':id')
  async updateChat(@Body() chat: UpdateChatDto, @Param() chatId: string) {
    return await this.chatService.updateChat(1, +chatId, chat);
  }
  @Delete(':id')
  async deleteChat(@Param() chatId: string) {
    return await this.chatService.deleteChat(1, +chatId);
  }
}
