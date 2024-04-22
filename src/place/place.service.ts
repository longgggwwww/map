import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getDistance } from 'geolib';
import { PrismaService } from 'nestjs-prisma';
import { FindWithinRadius } from './dto/find-place.dto';
import { UpdatePlaceTmpDto } from './dto/update-place.dto';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async updatePlaceTmp(
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
      wardId,
      website,
      createdById,
    }: UpdatePlaceTmpDto,
  ) {
    const tmp = await this.prisma.placeTmp.update({
      where: { id },
      data: {
        name,
        categoryId,
        email,
        lat,
        phone,
        address,
        description,
        lng,
        status: 1,
        wardId,
        website,
        createdById,
      },
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
      createdById,
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
        createdById,
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
        createdById,
        placeId: id,
      },
    });
  }

  async getPlaceTmpList() {
    const tmps = await this.prisma.placeTmp.findMany();
    const result = await Promise.all(
      tmps.map(async (tmp) => {
        const [category, ward, user, place] = await Promise.all([
          tmp.categoryId
            ? this.prisma.category.findUnique({
                where: {
                  id: tmp.categoryId,
                },
              })
            : null,
          tmp.wardId
            ? this.prisma.ward.findUnique({
                where: {
                  id: tmp.wardId,
                },
                include: {
                  district: {
                    include: {
                      province: true,
                    },
                  },
                },
              })
            : null,
          tmp.createdById
            ? this.prisma.user.findUnique({
                where: {
                  id: tmp.createdById,
                },
                include: {
                  personal: true,
                },
              })
            : null,
          tmp.placeId
            ? this.prisma.place.findUnique({
                where: {
                  id: tmp.placeId,
                },
                include: {
                  category: true,
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
              })
            : null,
        ]);
        return {
          ...tmp,
          category,
          ward,
          createdBy: user,
          place,
        };
      }),
    );
    return result;
  }

  async getTmp(id: number) {
    const tmp = await this.prisma.placeTmp.findFirst({
      where: { id },
    });
    if (!tmp) {
      throw new NotFoundException();
    }
    const [category, ward, user] = await Promise.all([
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
      this.prisma.user.findUnique({
        where: {
          id: tmp.createdById,
        },
        include: {
          personal: true,
        },
      }),
    ]);
    return {
      ...tmp,
      category,
      ward,
      createdBy: user,
    };
  }

  async findMyPlaceTmp(userId: number) {
    const tmps = await this.prisma.placeTmp.findMany({
      where: {
        createdById: userId,
      },
    });
    return tmps.map((tmp) => {
      // const [category, ward, user] = await Promise.all([
      //   this.prisma.category.findUnique({
      //     where: {
      //       id: tmp.categoryId,
      //     },
      //   }),
      //   this.prisma.ward.findUnique({
      //     where: {
      //       id: tmp.wardId,
      //     },
      //   }),
      //   this.prisma.user.findUnique({
      //     where: {
      //       id: tmp.createdById,
      //     },
      //     include: {
      //       personal: true,
      //     },
      //   }),
      // ]);
      // if (!category) {
      //   return null;
      // }
      // if (!ward) {
      //   return null;
      // }
      // if (!user) {
      //   return null;
      // }
      return {
        ...tmp,
        // category,
        // ward,
        // user,
      };
    });
  }

  async reviewPlaceTmp(placeTmpIds: number[], status: number) {
    const placeTmp = await this.prisma.placeTmp.updateMany({
      where: {
        id: {
          in: placeTmpIds,
        },
      },
      data: {
        status,
      },
    });
    const placeTmps = await this.prisma.placeTmp.findMany({
      where: {
        id: {
          in: placeTmpIds,
        },
      },
    });
    for (const placeTmp of placeTmps) {
      await this.prisma.place.update({
        where: {
          id: placeTmp.placeId,
        },
        data: {
          name: placeTmp.name,
          category: placeTmp.categoryId
            ? {
                connect: {
                  id: placeTmp.categoryId,
                },
              }
            : undefined,
          ward: placeTmp.wardId
            ? {
                connect: {
                  id: placeTmp.wardId,
                },
              }
            : undefined,
          address: placeTmp.address,
          description: placeTmp.description,
          email: placeTmp.email,
          phone: placeTmp.phone,
          website: placeTmp.website,
          lat: placeTmp.lat,
          lng: placeTmp.lng,
        },
      });
    }
    return placeTmp;
  }

  async updateTmpPhotos(id: number, photos: string[]) {
    const tmp = await this.prisma.placeTmp.update({
      where: { id },
      data: {
        photos,
      },
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

  async findAllV2(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaceWhereUniqueInput;
    where?: Prisma.PlaceWhereInput;
    orderBy?: Prisma.PlaceOrderByWithRelationAndSearchRelevanceInput;
    categoryId?: number;
    lat?: number;
    lng?: number;
    radius?: number;
  }) {
    const { skip, take, cursor, where, orderBy, categoryId } = params;
    const places = await this.prisma.place.findMany({
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
        address: true,
        photos: true,
        reviews: true,
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
    if (params.lat && params.lng && params.radius) {
      const lat: number = parseFloat(params.lat.toString());
      const lng: number = parseFloat(params.lng.toString());
      const radius: number = parseInt(params.radius.toString());
      const filterdPlaces = places.reduce((a, place) => {
        const dis = getDistance(
          {
            latitude: place.lat,
            longitude: place.lng,
          },
          {
            latitude: lat,
            longitude: lng,
          },
        );
        if (dis < radius) {
          a.push({
            ...place,
            distance: dis,
          });
        }
        return a;
      }, []);
      return filterdPlaces.sort((a, b) => a.distance - b.distance);
    }
    return places;
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
                _count: true,
                personal: true,
                reviews: true,
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
    try {
      const { where, data } = params;
      console.log('log:', data);
      const doc = await this.prisma.place.update({
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
      return doc;
    } catch (err) {
      console.log(err);
    }
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
            user: {
              include: {
                personal: true,
                reviews: true,
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

  async findWithinRadius(dto: FindWithinRadius) {
    const places = await this.prisma.place.findMany({
      where: {
        status: 0,
      },
      take: 5,
      include: {},
    });
    return places;
  }
}
