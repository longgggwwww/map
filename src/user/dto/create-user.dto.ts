import { Prisma } from '@user/prisma/client';
import {
    IsBooleanString,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumberString()
    @IsOptional()
    type?: number;

    @IsBooleanString()
    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    profile?: Prisma.ProfileCreateNestedOneWithoutUserInput;

    @IsNumberString()
    @IsOptional()
    roleId?: number;
}
