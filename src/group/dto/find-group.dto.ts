import { Prisma } from '@prisma/client'

export class FindGroupDto {
  skip?: number
  take?: number
  cursor?: Prisma.PermissionGroupWhereUniqueInput
  where?: Prisma.PermissionGroupWhereInput
  orderBy?: Prisma.PermissionGroupOrderByWithRelationAndSearchRelevanceInput
}
