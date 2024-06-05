import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { User, Chat } from 'db/entity';
import { DataSource, ILike, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: Partial<User>) {
    const isUser = await this.findOneBy({ email: user.email });
    if (isUser) throw new ConflictException();
    return this.save(user);
  }

  async findUsers(username: string) {
    const users = await this.find({
      where: { username: ILike(`%${username}%`) },
      take: 21,
    });
    if (users.length > 20) {
      throw new PayloadTooLargeException(
        'Too many results. Please refine your search.',
      );
    }
    return users.slice(0, 20);
  }

  async getUser(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: ['admin_chats', 'participant_chat', 'friends'],
    });
    if (!user) throw new NotFoundException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  async updateUser(id: number, user: Partial<User>) {
    const isUser = await this.findOneByOrFail({ id });

    if (!isUser) return new NotFoundException();

    const newUserData = { ...isUser, ...user };
    return await this.update(id, newUserData);
  }

  async addFriends(ids: number[], userId: number) {
    const user = await this.findOne({
      where: { id: userId },
      relations: ['admin_chats', 'participant_chat', 'friends'],
    });
    if (!user) throw new NotFoundException();
    const friendsToAdd = await Promise.all(
      ids.map(async (user_id) => {
        const friend = await this.findOne({
          where: { id: user_id },
          relations: ['admin_chats', 'participant_chat', 'friends'],
        });
        if (!friend) throw new NotFoundException();
        return friend;
      }),
    );

    const existingFriendIds = new Set(user.friends.map((friend) => friend.id));
    const newFriends = friendsToAdd.filter(
      (friend) => !existingFriendIds.has(friend.id),
    );
    if (newFriends.length === 0)
      throw new BadRequestException('Friends already in list');
    user.friends.push(...newFriends);
    const newChats = user.friends.map((newFriend) => {
      const chat = new Chat();
      chat.chat_name = [user.username, newFriend.username];
      chat.created_at = Date.now().toString();
      chat.created_by = user;
      chat.archived = false;
      chat.members = [user, newFriend];
      chat.type = 'private';
      return chat;
    });
    await this.dataSource.getRepository(Chat).save(newChats);
    await this.save(user);
    return user;
  }

  async deleteUser(id: number) {
    const isUser = await this.findOneByOrFail({ id });
    if (!isUser) return new Error();
    return await this.delete(id);
  }

  async getUserInfo(email: string) {
    const user = await this.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async isUser(email: string) {
    const isUser = await this.findOne({ where: { email } });
    if (isUser === null) {
      return false;
    }
    return true;
  }
}
