import { CreateUserDto, UpdateUserDto } from 'src/common/schema/user.schema';
import { UserService } from './service/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async creteUser(@Body() user: CreateUserDto) {
    const newUser = await this.userService.createUser({ ...user });
    return newUser;
  }

  @Get(':id')
  async getUserData(@Param('id') userId: number) {
    console.log(+userId);
    const userData = await this.userService.getUser(+userId);
    return userData;
  }

  @Patch(':id')
  async updateUserData(
    @Param() userId: number,
    @Body() userData: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(userId, userData);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param() userId: number) {
    const deleteUser = await this.userService.deleteUser(userId);
    return deleteUser;
  }
}
