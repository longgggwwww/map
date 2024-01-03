import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserStatusDto {
    @IsArray()
    userIds: number[];

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}
