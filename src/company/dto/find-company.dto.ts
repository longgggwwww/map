import { Prisma } from '@prisma/client';

export class FindCompanyDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.CompanyWhereUniqueInput;
  where?: Prisma.CompanyWhereInput;
  orderBy?: Prisma.CompanyOrderByWithRelationAndSearchRelevanceInput;
}
