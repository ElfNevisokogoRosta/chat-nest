import { UpdateUserDto } from 'src/common/schema/user.schema';
import { UserService } from './service/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@Req() req: any) {
    return await this.userService.getUser(req?.user.id);
  }

  @Get('find')
  @UseGuards(AuthGuard('jwt'))
  async getUserByUsername(@Query('username') username: string) {
    return await this.userService.getUsersByUsername(username);
  }

  @Patch('friend')
  @UseGuards(AuthGuard('jwt'))
  async addFriends(@Req() req: any, @Body() body: { friends: number[] }) {
    const user_id = req?.user.id;
    const friends = body.friends;
    return await this.userService.addFriends(friends, user_id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async updateUserData(@Req() req: any, @Body() userData: UpdateUserDto) {
    const userId = req.user.id;
    return await this.userService.updateUser(userId, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
