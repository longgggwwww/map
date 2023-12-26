import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PermissionGroupCreateInput) {
    return this.prisma.permissionGroup.create({
      data,
      include: {
        permissions: true,
        createdBy: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PermissionGroupWhereUniqueInput;
    where?: Prisma.PermissionGroupWhereInput;
    orderBy?: Prisma.PermissionGroupOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.permissionGroup.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        permissions: true,
        createdBy: true,
      },
    });
  }

  async findUniq(where: Prisma.PermissionGroupWhereUniqueInput) {
    return this.prisma.permissionGroup.findUniqueOrThrow({
      where,
      include: {
        permissions: true,
        createdBy: true,
      },
    });
  }

  async update(params: {
    where: Prisma.PermissionGroupWhereUniqueInput;
    data: Prisma.PermissionGroupUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.permissionGroup.update({
      data,
      where,
      include: {
        permissions: true,
        createdBy: true,
      },
    });
  }

  async removeMany(where: Prisma.PermissionGroupWhereInput) {
    return this.prisma.permissionGroup.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.PermissionGroupWhereUniqueInput) {
    return this.prisma.permissionGroup.delete({
      where,
      include: {
        permissions: true,
        createdBy: true,
      },
    });
  }
}
