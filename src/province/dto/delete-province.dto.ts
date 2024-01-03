import { IsArray } from 'class-validator';

export class DeleteProvinceDto {
    @IsArray()
    ids: number[];
}
