import { UpdateUserDto } from 'src/common/schema/user.schema';
import { UserService } from './service/user.service';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUserData(@Param('id') userId: number) {
    return await this.userService.getUser(+userId);
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
