import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { MessageService } from '../../message/message.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  async afterInit(server: any) {
    this.logger.log(server);
    // const { chatId, page } = server;
    // const messages = await this.messageService.getAllMessages(+chatId, +page);
    // this.io.emit('initialMessage', messages);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(args);
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client id:${client.id} disconnected`);
  }
  @SubscribeMessage('createMessage')
  async createMessage(client: any, data: any) {
    const { userId, message } = data;
    const createdMessage = await this.messageService.createMessage(
      userId,
      message,
    );
    return {
      event: 'messageCreated',
      data: createdMessage,
    };
  }
}
