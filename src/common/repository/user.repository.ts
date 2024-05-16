import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'db/entity';
import { DataSource, Repository } from 'typeorm';

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
  async getUser(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: ['admin_chats', 'participant_chat'],
    });
    if (!user) return new Error();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }
  async updateUser(id: number, user: Partial<User>) {
    const isUser = await this.findOneByOrFail({ id });
    if (!isUser) return new Error();
    return await this.update(id, user);
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
