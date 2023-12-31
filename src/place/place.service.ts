import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PlaceCreateInput, userId?: number) {
    return this.prisma.place.create({
      data: {
        ...data,
        createdBy: {
          connect: {
            id: +userId,
          },
        },
      },
      include: {
        category: true,
        createdBy: {
          include: {
            personal: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        ward: {
          include: {
            district: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllV2(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaceWhereUniqueInput;
    where?: Prisma.PlaceWhereInput;
    orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput;
    categoryId?: number;
  }) {
    const { skip, take, cursor, where, orderBy, categoryId } = params;
    return this.prisma.place.findMany({
      skip,
      take: take ? +take : undefined,
      cursor,
      where: {
        ...where,
        categoryId,
      },
      orderBy,
      select: {
        id: true,
        name: true,
        lat: true,
        lng: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaceWhereUniqueInput;
    where?: Prisma.PlaceWhereInput;
    orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.place.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        category: true,
        createdBy: {
          include: {
            personal: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        ward: {
          include: {
            district: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.PlaceWhereUniqueInput) {
    return this.prisma.place.findUniqueOrThrow({
      where,
      include: {
        category: true,
        createdBy: {
          include: {
            personal: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        ward: {
          include: {
            district: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.PlaceWhereUniqueInput;
    data: Prisma.PlaceUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.place.update({
      data,
      where,
      include: {
        category: true,
        createdBy: {
          include: {
            personal: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        ward: {
          include: {
            district: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.PlaceWhereInput) {
    return this.prisma.place.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.PlaceWhereUniqueInput) {
    return this.prisma.place.delete({
      where,
      include: {
        category: true,
        createdBy: {
          include: {
            personal: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        ward: {
          include: {
            district: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  async review(params: { where: Prisma.PlaceWhereInput; status: number }) {
    const { where, status } = params;
    return this.prisma.place.updateMany({
      where,
      data: {
        status,
      },
    });
  }

  async search(
    str: string,
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PlaceWhereUniqueInput;
      orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput;
    },
  ) {
    const { skip, take, cursor, orderBy } = params;
    console.log('debug:', take);

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
        ],
        status: 0,
      },
      skip: skip ? +skip : undefined,
      take: take ? +parseInt(take.toString()) : undefined,
      cursor,
      orderBy,
      include: {
        category: true,
        createdBy: {
          include: {
            personal: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
        ward: {
          include: {
            district: {
              include: {
                province: true,
              },
            },
          },
        },
      },
    });
  }
}
