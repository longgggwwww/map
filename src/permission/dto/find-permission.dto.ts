import { Prisma } from '@prisma/client'

export class FindPermissionDto {
  skip?: number
  take?: number
  cursor?: Prisma.PermissionWhereUniqueInput
  where?: Prisma.PermissionWhereInput
  orderBy?: Prisma.PermissionOrderByWithRelationAndSearchRelevanceInput
}
