import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SubcategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SubCategoryCreateInput) {
    return this.prisma.subCategory.create({
      data,
      include: {
        createdBy: true,
        categories: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SubCategoryWhereUniqueInput;
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.subCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        createdBy: true,
        categories: true,
      },
    });
  }

  async findUniq(where: Prisma.SubCategoryWhereUniqueInput) {
    return this.prisma.subCategory.findUniqueOrThrow({
      where,
      include: {
        createdBy: true,
        categories: true,
      },
    });
  }

  async update(params: {
    where: Prisma.SubCategoryWhereUniqueInput;
    data: Prisma.SubCategoryUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.subCategory.update({
      data,
      where,
      include: {
        createdBy: true,
        categories: true,
      },
    });
  }

  async removeMany(where: Prisma.SubCategoryWhereInput) {
    return this.prisma.subCategory.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.SubCategoryWhereUniqueInput) {
    return this.prisma.subCategory.delete({
      where,
      include: {
        createdBy: true,
        categories: true,
      },
    });
  }
}
