import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateProvinceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsDateString()
    @IsOptional()
    createdAt?: string | Date;

    @IsDateString()
    @IsOptional()
    updatedAt?: string | Date;
}
