import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DistrictService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DistrictCreateInput) {
    return this.prisma.district.create({
      data,
      include: {
        province: true,
        wards: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DistrictWhereUniqueInput;
    where?: Prisma.DistrictWhereInput;
    orderBy?: Prisma.DistrictOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.district.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        province: true,
        wards: true,
      },
    });
  }

  async findUniq(where: Prisma.DistrictWhereUniqueInput) {
    return this.prisma.district.findUniqueOrThrow({
      where,
      include: {
        province: true,
        wards: true,
      },
    });
  }

  async update(params: {
    where: Prisma.DistrictWhereUniqueInput;
    data: Prisma.DistrictUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.district.update({
      data,
      where,
      include: {
        province: true,
        wards: true,
      },
    });
  }

  async removeMany(where: Prisma.DistrictWhereInput) {
    return this.prisma.district.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.DistrictWhereUniqueInput) {
    return this.prisma.district.delete({
      where,
      include: {
        province: true,
        wards: true,
      },
    });
  }
}
