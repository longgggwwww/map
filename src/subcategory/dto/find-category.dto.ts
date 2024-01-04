import { Prisma } from '@prisma/client';

export class FindSubCategoryDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.SubCategoryWhereUniqueInput;
  where?: Prisma.SubCategoryWhereInput;
  orderBy?: Prisma.SubCategoryOrderByWithRelationAndSearchRelevanceInput;
}
