import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from 'src/common/types/iUser';
import { CreateUserDto } from '../common/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async signIn(@Body() user: IUser) {
    return await this.authService.signIn(user);
  }
  @Post('register')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }
  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req: any) {
    const { user } = req;
    return await this.authService.refreshToken(user);
  }
}
