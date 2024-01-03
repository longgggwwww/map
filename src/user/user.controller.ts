import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Request,
    UnauthorizedException,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import bcrypt from 'bcrypt';
import { diskStorage } from 'multer';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { ChangePasswordDto } from './dto/change-pass-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UserController {
    constructor(private user: UserService) {}

    @Post('me/avatar')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: 'uploads/avatars',
                filename(_req, file, callback) {
                    callback(
                        null,
                        Buffer.from(file.originalname, 'latin1').toString(
                            'utf8',
                        ),
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
                    new FileTypeValidator({
                        fileType: /(jpeg|jpg|png)$/i,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Request() req,
    ) {
        return this.user.update({
            where: {
                id: +req.user?.userId,
            },
            data: {
                profile: {
                    update: {
                        avatar: file.path,
                    },
                },
            },
        });
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.user.create({
            ...dto,
            profile: dto.profile
                ? {
                      create: {},
                  }
                : undefined,
            role: {
                connect: {
                    id: dto.roleId,
                },
            },
        });
    }

    @Get()
    findAll(@Query() dto: FindUserDto) {
        return this.user.findAll(dto);
    }

    @Get('me')
    currentUser(@Request() req) {
        return this.user.findUniq({ id: +req.user?.userId });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.user.findUniq({ id });
    }

    // @Patch('status')
    // updateUsers(@Body() dto: UpdateUserStatusDto) {
    //     return this.user.updateMany({
    //         where: {
    //             id: {
    //                 in: dto.userIds,
    //             },
    //         },
    //         data: {
    //             status: dto.status,
    //         },
    //     });
    // }

    @Patch('me/password')
    async changePassword(@Body() dto: ChangePasswordDto, @Request() req) {
        try {
            // Check pass
            const id = req.user?.userId as number;
            const user = await this.user.findUniq({ id });
            const isMatch = await bcrypt.compare(dto.password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Sai mật khẩu');
            }

            // Gen hash
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(dto.newPassword, salt);
            return this.user.update({
                where: { id },
                data: {
                    password: hash,
                },
            });
        } catch (err) {
            throw err;
        }
    }

    // @Patch('profile')
    // updateProfile(
    //     @Request() req,
    //     @Body() updateMyProfileDto: UpdateMyProfileDto,
    // ) {
    //     const date = new Date(updateMyProfileDto.birthday);
    //     const form = { ...updateMyProfileDto, birthday: date };
    //     return this.user.update({
    //         where: {
    //             id: +req.user.userId,
    //         },
    //         data: {
    //             profile: {
    //                 update: form,
    //             },
    //         },
    //     });
    // }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.user.update({
            where: { id },
            data: dto,
        });
    }

    // @Patch('role')
    // setRole(@Body() dto: SetRoleDto) {
    //     return this.user.updateMany({
    //         where: {
    //             id: {
    //                 in: dto.userIds,
    //             },
    //         },
    //         data: {},
    //     });
    // }

    @Delete('batch')
    removeMany(@Body() dto: DeleteUserDto) {
        return this.user.remove({
            id: {
                in: dto.ids,
            },
        });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.user.remove({ id });
    }
}
