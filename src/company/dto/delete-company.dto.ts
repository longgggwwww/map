import { IsArray } from 'class-validator';

export class DeleteCompanyDto {
    @IsArray()
    ids: number[];
}
