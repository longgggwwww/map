import { Prisma } from '@prisma/client';

export class FindWardDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.WardWhereUniqueInput;
  where?: Prisma.WardWhereInput;
  orderBy?: Prisma.WardOrderByWithRelationAndSearchRelevanceInput;
}
