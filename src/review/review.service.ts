import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput) {
    return this.prisma.review.create({
      data,
      include: {
        place: true,
        user: true,
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ReviewWhereUniqueInput
    where?: Prisma.ReviewWhereInput
    orderBy?: Prisma.ReviewOrderByWithRelationAndSearchRelevanceInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        place: true,
        user: true,
      },
    })
  }

  async findUniq(where: Prisma.ReviewWhereUniqueInput) {
    return this.prisma.review.findUniqueOrThrow({
      where,
      include: {
        place: true,
        user: true,
      },
    })
  }

  async update(params: {
    where: Prisma.ReviewWhereUniqueInput
    data: Prisma.ReviewUpdateInput
  }) {
    const { where, data } = params
    return this.prisma.review.update({
      data,
      where,
      include: {
        place: true,
        user: true,
      },
    })
  }

  async removeMany(where: Prisma.ReviewWhereInput) {
    return this.prisma.review.deleteMany({
      where,
    })
  }

  async remove(where: Prisma.ReviewWhereUniqueInput) {
    return this.prisma.review.delete({
      where,
      include: {
        place: true,
        user: true,
      },
    })
  }
}
