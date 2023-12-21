import { Prisma } from '@prisma/client'

export class FindProvinceDto {
    skip?: number
    take?: number
    cursor?: Prisma.ProvinceWhereUniqueInput
    where?: Prisma.ProvinceWhereInput
    orderBy?: Prisma.ProvinceOrderByWithRelationInput
}
