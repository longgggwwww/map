import { IsArray } from 'class-validator';

export class DeleteUserDto {
    @IsArray()
    ids: number[];
}
