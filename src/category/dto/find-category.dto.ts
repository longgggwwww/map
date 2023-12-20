import { Prisma } from '@prisma/client';

export class FindCategoryDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.CategoryWhereUniqueInput;
  where?: Prisma.CategoryWhereInput;
  orderBy?: Prisma.CategoryOrderByWithRelationInput;
}
