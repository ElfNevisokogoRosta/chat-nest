import { UpdateUserDto } from 'src/common/schema/user.schema';
import { UserService } from './service/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  @Patch(':id')
  async updateUserData(
    @Param('id') userId: number,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
