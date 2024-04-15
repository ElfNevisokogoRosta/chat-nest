import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from 'src/common/schema/message.schema';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @Post(':id')
  // async createMessage(
  //   @Body() message: CreateMessageDto,
  //   @Param() chatId: string,
  // ) {
  //   return await this.messageService.createMessage(1, +chatId, message);
  // }

  @Patch(':id')
  async updateMessage(
    @Body() message: UpdateMessageDto,
    @Param() messageId: string,
  ) {
    return await this.messageService.updateMessage(1, +messageId, message);
  }

  @Delete(':id')
  async deleteMessage(@Param() messageId: string) {
    return await this.messageService.deleteMessage(1, +messageId);
  }
}
