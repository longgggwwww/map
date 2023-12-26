import { Prisma } from '@prisma/client';

export class FindDistrictDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.DistrictWhereUniqueInput;
  where?: Prisma.DistrictWhereInput;
  orderBy?: Prisma.DistrictOrderByWithRelationAndSearchRelevanceInput;
}
