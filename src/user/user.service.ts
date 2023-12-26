import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { ChangePasswordDto } from './dto/change-pass-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        myPlaces: true,
        createdCategories: true,
        reviews: true,
        personal: {
          include: {
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
        },
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        myPlaces: true,
        createdCategories: true,
        reviews: true,
        personal: {
          include: {
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
        },
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }

  async findUniq(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({
      where,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        myPlaces: true,
        createdCategories: true,
        reviews: true,
        personal: {
          include: {
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
        },
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    const { password, ...rest } = data;
    return this.prisma.user.update({
      data: rest,
      where,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        myPlaces: true,
        createdCategories: true,
        reviews: true,
        personal: {
          include: {
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
        },
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }

  async removeMany(where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        myPlaces: true,
        createdCategories: true,
        reviews: true,
        personal: {
          include: {
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
        },
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }

  async updateUserStatus(params: {
    where: Prisma.UserWhereInput;
    data: {
      status: boolean;
    };
  }) {
    const { where, data } = params;
    return this.prisma.user.updateMany({
      data: {
        isActive: data.status,
      },
      where,
    });
  }

  async changePassword(params: {
    where: Prisma.UserWhereUniqueInput;
    data: ChangePasswordDto;
  }) {
    const { where, data } = params;
    const user = await this.prisma.user.findUniqueOrThrow({ where });
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.newPassword, salt);
    return this.prisma.user.update({
      where,
      data: {
        password: hash,
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        myPlaces: true,
        createdCategories: true,
        reviews: true,
        personal: {
          include: {
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
        },
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }
}
