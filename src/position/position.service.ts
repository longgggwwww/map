import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PositionCreateInput) {
    return this.prisma.position.create({
      data,
      include: {
        department: true,
        persons: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PositionWhereUniqueInput;
    where?: Prisma.PositionWhereInput;
    orderBy?: Prisma.PositionOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.position.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        department: true,
        persons: true,
      },
    });
  }

  async findUniq(where: Prisma.PositionWhereUniqueInput) {
    return this.prisma.position.findUniqueOrThrow({
      where,
      include: {
        department: true,
        persons: true,
      },
    });
  }

  async update(params: {
    where: Prisma.PositionWhereUniqueInput;
    data: Prisma.PositionUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.position.update({
      data,
      where,
      include: {
        department: true,
        persons: true,
      },
    });
  }

  async removeMany(where: Prisma.PositionWhereInput) {
    return this.prisma.position.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.PositionWhereUniqueInput) {
    return this.prisma.position.delete({
      where,
      include: {
        department: true,
        persons: true,
      },
    });
  }
}
