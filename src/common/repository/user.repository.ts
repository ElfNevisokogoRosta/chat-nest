import { Injectable } from '@nestjs/common';
import { User } from 'db/entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(user: Partial<User>) {
    const isUser = await this.findOneByOrFail({ email: user.email });
    if (isUser) return new Error();
    return await this.save(user);
  }
  async getUser(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: ['contacts_list', 'admin_chats', 'participant_chat'],
    });
    if (!user) return new Error();
    return user;
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
}
