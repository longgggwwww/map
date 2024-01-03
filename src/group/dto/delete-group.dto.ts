import { IsArray, IsString } from 'class-validator';

export class DeleteGroupDto {
    @IsString({ each: true })
    @IsArray()
    ids: number[];
}
