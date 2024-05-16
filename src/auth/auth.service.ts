import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './auth.types';
import { IUser } from 'src/common/types/iUser';
import { CreateUserDto } from 'src/common/schema/user.schema';
import { UserRepository } from '../common/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.getUserInfo(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException('Something wrong');
  }
  async signIn(user: IUser) {
    const userData = await this.validateUser({
      email: user.email,
      password: user.password,
    });
    const payload: JwtPayload = {
      username: userData.username,
      email: userData.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      username: userData.username,
      email: userData.email,
      userId: userData.id,
    };
  }

  async signUp(user: CreateUserDto) {
    try {
      const hashPass = await bcrypt.hash(user.password, 10);
      const newUser = {
        ...user,
        password: hashPass,
        online: true,
        created_at: Date.now().toString(),
        last_time_active: Date.now().toString(),
      };
      const newUserData = await this.userRepository.createUser(newUser);
      const payload: JwtPayload = {
        email: newUser?.email,
      };

      return {
        access_token: this.jwtService.sign(payload),
        id: newUserData.id,
      };
    } catch (e) {
      throw new ConflictException();
    }
  }
}
