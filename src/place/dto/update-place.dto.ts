import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}

export class UpdatePlaceTmpDto {
  name: string;
  address?: string;
  photos?: string[];
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  lng: number;
  lat: number;
  status?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  categoryId?: number;
  wardId?: number;
}
