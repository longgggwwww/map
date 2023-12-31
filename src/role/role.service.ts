import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({
      data,
      include: {
        users: true,
        permissions: true,
        createdBy: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        users: true,
        permissions: true,
        createdBy: true,
      },
    });
  }

  async findUniq(where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.findUniqueOrThrow({
      where,
      include: {
        users: true,
        permissions: true,
        createdBy: true,
      },
    });
  }

  async update(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }) {
    const { where, data } = params;
    return await this.prisma.role.update({
      data,
      where,
      include: {
        users: true,
        permissions: true,
        createdBy: true,
      },
    });
  }

  async removeMany(where: Prisma.RoleWhereInput) {
    return this.prisma.role.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.delete({
      where,
      include: {
        users: true,
        permissions: true,
        createdBy: true,
      },
    });
  }
}
