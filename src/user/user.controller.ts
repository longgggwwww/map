import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() findUserDto: FindUserDto) {
    return this.userService.findAll(findUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUniq({ id: +id });
  }

  @Patch('status')
  updateUsers(@Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.userService.updateUserStatus({
      where: {
        id: {
          in: updateUserStatusDto.userIds,
        },
      },
      data: {
        status: updateUserStatusDto.status,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.removeMany({
      id: {
        in: deleteUserDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: +id });
  }
}
