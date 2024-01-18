import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from 'nestjs-prisma';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { ChangePasswordDto } from './dto/change-pass-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: 'uploads/avatars',
        filename(_req, file, callback) {
          callback(
            null,
            Buffer.from(file.originalname, 'latin1').toString('utf8'),
          );
        },
      }),
    }),
  )
  uploadAvt(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          // new FileTypeValidator({
          //   fileType: /(jpeg|jpg|png)$/i,
          // }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ) {
    return this.userService.update({
      where: {
        id: +req.user.userId,
      },
      data: {
        personal: {
          update: {
            image: file.path,
          },
        },
      },
    });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() findUserDto: FindUserDto) {
    return this.userService.findAll(findUserDto);
  }

  @Get('me/my-places')
  myPlaces(@Request() req, @Query() { status }: { status: number }) {
    return this.userService.myPlaces(+req.user.userId, status);
  }

  @Get('me')
  currentUser(@Request() req) {
    return this.userService.findUniq({ id: +req.user.userId });
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

  @Patch('me/password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.userService.changePassword({
      where: {
        id: +req.user.userId,
      },
      data: changePasswordDto,
    });
  }

  @Patch('profile')
  updateProfile(
    @Request() req,
    @Body() updateMyProfileDto: UpdateMyProfileDto,
  ) {
    const date = new Date(updateMyProfileDto.birthday);
    const form = { ...updateMyProfileDto, birthday: date };
    return this.userService.update({
      where: {
        id: +req.user.userId,
      },
      data: {
        personal: {
          update: form,
        },
      },
    });
  }

  @Patch('role')
  setRole(@Body() setRoleDto: SetRoleDto) {
    return this.userService.setRole(setRoleDto.userIds, setRoleDto.roleId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({
      where: {
        id: +id,
      },
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
