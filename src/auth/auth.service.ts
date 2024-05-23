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

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {
  private readonly JWTTTL: string;
  private readonly RefreshJWTTTL: string;
  private readonly JWTSecret: string;
  private readonly RefreshJWThSecret: string;

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    this.JWTTTL = process.env.EXPIRE_IN;
    this.RefreshJWTTTL = process.env.REFRESH_EXPIRE_IN;
    this.JWTSecret = process.env.JWT_SECRET;
    this.RefreshJWThSecret = process.env.JWT_SECRET_REFRESH;
  }

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.getUserInfo(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async signIn(user: IUser) {
    const userData = await this.validateUser({
      email: user.email,
      password: user.password,
    });
    const payload: JwtPayload = {
      id: userData.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.JWTTTL,
        secret: this.JWTSecret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.RefreshJWTTTL,
        secret: this.RefreshJWThSecret,
      }),
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
        id: newUserData.id,
      };
      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: this.JWTTTL,
          secret: this.JWTSecret,
        }),
        refresh_token: this.jwtService.sign(payload, {
          expiresIn: this.RefreshJWTTTL,
          secret: this.RefreshJWThSecret,
        }),
      };
    } catch (e) {
      throw new ConflictException('User already exists');
    }
  }

  async refreshToken(user: IUser) {
    const payload: JwtPayload = {
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.JWTTTL,
        secret: this.JWTSecret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.RefreshJWTTTL,
        secret: this.RefreshJWThSecret,
      }),
    };
  }
}
