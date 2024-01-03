import { IsArray } from 'class-validator';

export class DeleteCategoryDto {
    @IsArray()
    ids: number[];
}
