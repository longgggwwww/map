import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    tax: string;

    @IsNumber()
    @IsOptional()
    createdById?: number;

    @IsDateString()
    @IsOptional()
    createdAt?: string | Date;

    @IsDateString()
    @IsOptional()
    updatedAt?: string | Date;
}
