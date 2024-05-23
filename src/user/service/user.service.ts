import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/common/repository/user.repository';
import { UpdateUserDto } from 'src/common/schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: number) {
    try {
      return await this.userRepository.getUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateUser(id: number, user: UpdateUserDto) {
    try {
      return await this.userRepository.updateUser(id, user);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async addFriends(friends: number[], user_id: number) {
    try {
      return await this.userRepository.addFriends(friends, user_id);
    } catch (e) {
      throw e;
    }
  }

  async getUsersByUsername(username: string) {
    try {
      return await this.userRepository.findUsers(username);
    } catch (error) {
      return error;
    }
  }
}
