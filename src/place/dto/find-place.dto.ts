import { Prisma } from '@prisma/client';

export class FindPlaceDto {
  skip?: number;

  take?: number;

  cursor?: Prisma.PlaceWhereUniqueInput;

  where?: Prisma.PlaceWhereInput;

  status?: number;

  orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput;

  categoryId?: number;
}

export class FindWithinRadius {
  lat: number;
  lng: number;
  radius: number;
}
