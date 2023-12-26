import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

export class FindPlaceDto {
  @Type(() => Number)
  skip?: number;

  @Type(() => Number)
  take?: number;

  cursor?: Prisma.PlaceWhereUniqueInput;

  where?: Prisma.PlaceWhereInput;

  orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput;
}
