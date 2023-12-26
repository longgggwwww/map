import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PlaceCreateInput) {
    return this.prisma.place.create({
      data,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.PlaceWhereUniqueInput
    where?: Prisma.PlaceWhereInput
    orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.place.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async findUniq(where: Prisma.PlaceWhereUniqueInput) {
    return this.prisma.place.findUniqueOrThrow({
      where,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async update(params: {
    where: Prisma.PlaceWhereUniqueInput
    data: Prisma.PlaceUpdateInput
  }) {
    const { where, data } = params
    return this.prisma.place.update({
      data,
      where,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async removeMany(where: Prisma.PlaceWhereInput) {
    return this.prisma.place.deleteMany({
      where,
    })
  }

  async remove(where: Prisma.PlaceWhereUniqueInput) {
    return this.prisma.place.delete({
      where,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async review(params: {
    where: Prisma.PlaceWhereUniqueInput
    status: number
  }) {
    const { where, status } = params
    return this.prisma.place.update({
      data: {
        status,
      },
      where,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async search(
    str: string,
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.PlaceWhereUniqueInput
      orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput
    },
  ) {
    const { skip, take, cursor, orderBy } = params
    return this.prisma.place.findMany({
      where: {
        OR: [
          {
            name: {
              contains: str,
              mode: 'insensitive',
            },
          },
          {
            category: {
              name: {
                contains: str,
                mode: 'insensitive',
              },
            },
          },
          {
            address: {
              contains: str,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip: skip ? +skip : undefined,
      take,
      cursor,
      orderBy,
      include: {
        category: true,
        createdBy: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })
  }
}
