import { Prisma } from '@prisma/client';

export class CreatePlaceDto implements Prisma.PlaceCreateInput {
  name: string;
  photos?: Prisma.PlaceCreatephotosInput | string[];
  address?: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  lng: number;
  lat: number;
  status?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  category?: Prisma.CategoryCreateNestedOneWithoutPlacesInput;
  createdBy?: Prisma.UserCreateNestedOneWithoutMyPlacesInput;
  reviews?: Prisma.ReviewCreateNestedManyWithoutPlaceInput;
}
