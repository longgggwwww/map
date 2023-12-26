import { Prisma } from '@prisma/client';

export class FindDepartmentDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.DepartmentWhereUniqueInput;
  where?: Prisma.DepartmentWhereInput;
  orderBy?: Prisma.DepartmentOrderByWithRelationAndSearchRelevanceInput;
}
