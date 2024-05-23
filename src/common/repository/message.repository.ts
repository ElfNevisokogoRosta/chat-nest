import { Injectable } from '@nestjs/common';
import { Chat, User } from 'db/entity';
import { Message } from 'db/entity/message.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private readonly dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async createMessage(
    userId: number,
    chatId: number,
    message: Partial<Message>,
  ) {
    const chat: Chat | undefined = await this.dataSource.manager.findOne(Chat, {
      where: { id: chatId },
    });
    const user: User | undefined = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) return new Error();
    if (!chat) return new Error();
    const newMessage = await this.save({ ...message, chat, user });
    return newMessage;
  }

  async updateMessage(
    userId: number,
    messageId: number,
    message: Partial<Message>,
  ) {
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) return new Error();
    const isMessage = await this.findOneByOrFail({ id: messageId });
    if (!isMessage) return new Error();
    if (!(message.user.id === user.id)) return new Error();
    return await this.update(messageId, message);
  }

  async deleteMessage(messageId: number, userId: number) {
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) return new Error();
    const isMessage = await this.findOneByOrFail({ id: messageId });
    if (!isMessage) return new Error();
    if (!(user.id === isMessage.user.id)) return new Error();
    return await this.delete(messageId);
  }
  async getAllMessages(chatId: number, page: number = 1, limit: number = 15) {
    const skip = (page - 1) * limit;
    const chat: Chat | undefined = await this.dataSource.manager.findOne(Chat, {
      where: { id: chatId },
    });
    if (!chat) throw new Error();
    return await this.createQueryBuilder('message')
      .leftJoinAndSelect('message.chat', 'chat')
      .leftJoinAndSelect('message.user', 'user')
      .where('chat.id = :chatId', { chatId })
      .orderBy('message.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();
  }
}
