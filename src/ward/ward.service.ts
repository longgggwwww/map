import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class WardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.WardCreateInput) {
    return this.prisma.ward.create({
      data,
      include: {
        district: true,
        persons: true,
      },
    });
  }

  async findAll(params: {
    cursor?: Prisma.WardWhereUniqueInput;
    orderBy?: Prisma.WardOrderByWithRelationAndSearchRelevanceInput;
    skip?: number;
    take?: number;
    where?: Prisma.WardWhereInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ward.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        district: true,
        persons: true,
      },
    });
  }

  async findUniq(where: Prisma.WardWhereUniqueInput) {
    return this.prisma.ward.findUniqueOrThrow({
      where,
      include: {
        district: true,
        persons: true,
      },
    });
  }

  async update(params: {
    where: Prisma.WardWhereUniqueInput;
    data: Prisma.WardUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.ward.update({
      data,
      where,
      include: {
        district: true,
        persons: true,
      },
    });
  }

  async removeMany(where: Prisma.WardWhereInput) {
    return this.prisma.ward.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.WardWhereUniqueInput) {
    return this.prisma.ward.delete({
      where,
      include: {
        district: true,
        persons: true,
      },
    });
  }
}
