import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      include: {
        personal: true,
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
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        personal: true,
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }

  async findUniq(where: Prisma.UserWhereUniqueInput) {
    // const users = [
    //   {
    //     userId: 1,
    //     username: 'john',
    //     password: 'changeme',
    //   },
    //   {
    //     userId: 2,
    //     username: 'maria',
    //     password: 'guess',
    //   },
    // ];
    // return users.find((user) => user.username === where.username);

    return this.prisma.user.findUnique({
      where,
      include: {
        personal: true,
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
    return this.prisma.user.update({
      data,
      where,
      include: {
        personal: true,
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
        personal: true,
        createdRoles: true,
        createdPermissions: true,
        log: true,
      },
    });
  }
}
