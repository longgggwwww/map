import { Prisma } from '@prisma/client'

export class FindPositionDto {
  skip?: number
  take?: number
  cursor?: Prisma.PositionWhereUniqueInput
  where?: Prisma.PositionWhereInput
  orderBy?: Prisma.PositionOrderByWithRelationAndSearchRelevanceInput
}
