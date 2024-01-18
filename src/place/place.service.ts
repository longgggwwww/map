import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpdatePlaceTmpDto } from './dto/update-place.dto';

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

  async addPlaceTmp(
    id: number,
    {
      name,
      categoryId,
      email,
      lat,
      phone,
      address,
      description,
      lng,
      status,
      wardId,
      website,
    }: UpdatePlaceTmpDto,
  ) {
    return this.prisma.placeTmp.upsert({
      where: { id },
      create: {
        name,
        categoryId,
        lat,
        lng,
        email,
        phone,
        website,
        address,
        description,
        status,
        wardId,
        placeId: id,
      },
      update: {
        name,
        categoryId,
        lat,
        lng,
        email,
        phone,
        website,
        address,
        description,
        status,
        wardId,
        placeId: id,
      },
    });
  }

  async getTmp(id: number) {
    const tmp = await this.prisma.placeTmp.findFirst({
      where: { id },
    });
    const [category, ward] = await Promise.all([
      this.prisma.category.findUnique({
        where: {
          id: tmp.categoryId,
        },
      }),
      this.prisma.ward.findUnique({
        where: {
          id: tmp.wardId,
        },
      }),
    ]);
    return {
      ...tmp,
      category,
      ward,
    };
  }

  // async reviewPlaceTmp(placeTmpIds: number[], status: number) {
  //   return this.prisma.placeTmp.updateMany({
  //     where: {
  //       id: {
  //         in
  //       }
  //     }
  //   })
  // }

  async updateTmpPhotos(id: number, photos: string[]) {
    return this.prisma.placeTmp.update({
      where: { id },
      data: {
        photos,
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
            user: {
              include: {
                personal: true,
              },
            },
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
