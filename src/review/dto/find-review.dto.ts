import { Prisma } from '@prisma/client';

export class FindReviewDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ReviewWhereUniqueInput;
  where?: Prisma.ReviewWhereInput;
  orderBy?: Prisma.ReviewOrderByWithRelationAndSearchRelevanceInput;
}
