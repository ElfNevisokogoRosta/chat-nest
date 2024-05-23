import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageRepository } from 'src/common/repository/message.repository';

interface ChatBody {
  created_at: string;
  text?: string;
  audio?: string;
  image?: string;
  chat_id: number;
  user_id: number;
}
@WebSocketGateway(3232, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  constructor(private readonly messageRepository: MessageRepository) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: ChatBody) {
    const { chat_id, user_id, ...rest } = body;
    const newMessage = await this.messageRepository.createMessage(
      user_id,
      chat_id,
      rest,
    );
    this.server.emit('onMessage', newMessage);
  }
}
