import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    color?: string;

    @IsString()
    @IsOptional()
    icon?: string;

    @IsNumberString()
    @IsOptional()
    createdById?: number;
}
