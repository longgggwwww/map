import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
