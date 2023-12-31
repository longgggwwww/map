import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProvinceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProvinceCreateInput) {
    return this.prisma.province.create({
      data,
      include: {
        districts: {
          include: {
            wards: true,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProvinceWhereUniqueInput;
    where?: Prisma.ProvinceWhereInput;
    orderBy?: Prisma.ProvinceOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.province.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        districts: {
          include: {
            wards: true,
          },
        },
      },
    });
  }

  async findUniq(where: Prisma.ProvinceWhereUniqueInput) {
    return this.prisma.province.findUniqueOrThrow({
      where,
      include: {
        districts: {
          include: {
            wards: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.ProvinceWhereUniqueInput;
    data: Prisma.ProvinceUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.province.update({
      data,
      where,
      include: {
        districts: {
          include: {
            wards: true,
          },
        },
      },
    });
  }

  async removeMany(where: Prisma.ProvinceWhereInput) {
    return this.prisma.province.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.ProvinceWhereUniqueInput) {
    return this.prisma.province.delete({
      where,
      include: {
        districts: {
          include: {
            wards: true,
          },
        },
      },
    });
  }
}
