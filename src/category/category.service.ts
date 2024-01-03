import { Prisma, PrismaClient } from '@map/prisma/client';
import { Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class CategoryService {
    constructor(private prisma: CustomPrismaService<PrismaClient>) {}

    async create(data: Prisma.CategoryCreateInput) {
        return this.prisma.client.category.create({
            data,
            include: {
                places: true,
            },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CategoryWhereUniqueInput;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.CategoryOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.category.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                places: true,
            },
        });
    }

    async findUniq(where: Prisma.CategoryWhereUniqueInput) {
        return this.prisma.client.category.findUniqueOrThrow({
            where,
            include: {
                places: true,
            },
        });
    }

    async update(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.client.category.update({
            where,
            data,
            include: {
                places: true,
            },
        });
    }

    async remove(where: Prisma.CategoryWhereInput) {
        return this.prisma.client.category.deleteMany({
            where,
        });
    }
}
