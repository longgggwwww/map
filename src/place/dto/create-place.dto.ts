import { Prisma } from '@prisma/client';

export class CreatePlaceDto implements Prisma.PlaceCreateInput {
  name: string;
  photos?: string[] | Prisma.PlaceCreatephotosInput;
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
  category?: Prisma.CategoryCreateNestedManyWithoutPlacesInput;
  createdBy?: Prisma.UserCreateNestedOneWithoutMyPlacesInput;
  reviews?: Prisma.ReviewCreateNestedManyWithoutPlaceInput;
}
