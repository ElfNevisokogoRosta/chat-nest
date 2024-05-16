import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/common/repository/user.repository';
import { CreateUserDto, UpdateUserDto } from 'src/common/schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    try {
      const userData = {
        ...user,
        created_at: Date.now().toString(),
        online: true,
        last_time_active: Date.now().toString(),
      };
      return await this.userRepository.createUser(userData);
    } catch (error) {
      throw new ConflictException();
    }
  }

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
  async getUserInfo(email: string) {
    try {
      return await this.userRepository.getUserInfo(email);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async isUser(email: string) {
    try {
      return await this.userRepository.isUser(email);
    } catch (error) {
      return error;
    }
  }
}
