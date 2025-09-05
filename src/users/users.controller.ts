import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto/User.dto';
import { UserLoginDto } from 'src/users/dto/userLogin.dto';
import { DeleteDto } from 'src/utils/delete.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: UserLoginDto) {
    return this.usersService.login(dto);
  }

  @Post('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id,dto);
  }

  @Post('delete')
  async deleteUser(@Body() dto: DeleteDto) {
    return this.usersService.delete(dto);
  }
}
