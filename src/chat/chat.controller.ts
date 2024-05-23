import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { CreateChatDto } from 'src/common/schema/chat.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createChat(@Body() chat: CreateChatDto, @Req() req: any) {
    const user_id = req.user.id;
    return await this.chatService.createChat(user_id, chat);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getChatInfo(@Param('id') id: string) {
    return await this.chatService.getChat(+id);
  }

  // @Patch(':id')
  // async updateChat(@Body() chat: UpdateChatDto, @Param() chatId: string) {
  //   return await this.chatService.updateChat(1, +chatId, chat);
  // }

  @Delete(':id')
  async deleteChat(@Param() chatId: string) {
    return await this.chatService.deleteChat(1, +chatId);
  }
}
