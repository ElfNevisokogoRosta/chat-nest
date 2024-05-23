import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './service/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'db/entity';
import { ChatRepository } from 'src/common/repository/chat.repository';
import { ChatGateway } from './service/chat.gateway';
import { MessageModule } from '../message/message.module';
import { MessageRepository } from 'src/common/repository/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), MessageModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway, MessageRepository],
  exports: [ChatService],
})
export class ChatModule {}
