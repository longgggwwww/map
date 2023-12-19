import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data,
      include: {
        departments: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.company.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        departments: true,
      },
    });
  }

  async findUniq(where: Prisma.CompanyWhereUniqueInput) {
    return this.prisma.company.findUnique({
      where,
      include: {
        departments: true,
      },
    });
  }

  async update(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.company.update({
      data,
      where,
      include: {
        departments: true,
      },
    });
  }

  async removeMany(where: Prisma.CompanyWhereInput) {
    return this.prisma.company.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.CompanyWhereUniqueInput) {
    return this.prisma.company.delete({
      where,
      include: {
        departments: true,
      },
    });
  }
}
