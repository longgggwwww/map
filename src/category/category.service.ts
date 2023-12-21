import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.CategoryCreateInput) {
        return this.prisma.category.create({
            data,
            include: {
                createdBy: true,
                places: true,
            },
        })
    }

    async findAll(params: {
        skip?: number
        take?: number
        cursor?: Prisma.CategoryWhereUniqueInput
        where?: Prisma.CategoryWhereInput
        orderBy?: Prisma.CategoryOrderByWithRelationInput
    }) {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.category.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                createdBy: true,
                places: true,
            },
        })
    }

    async findUniq(where: Prisma.CategoryWhereUniqueInput) {
        return this.prisma.category.findUniqueOrThrow({
            where,
            include: {
                createdBy: true,
                places: true,
            },
        })
    }

    async update(params: {
        where: Prisma.CategoryWhereUniqueInput
        data: Prisma.CategoryUpdateInput
    }) {
        const { where, data } = params
        return this.prisma.category.update({
            data,
            where,
            include: {
                createdBy: true,
                places: true,
            },
        })
    }

    async removeMany(where: Prisma.CategoryWhereInput) {
        return this.prisma.category.deleteMany({
            where,
        })
    }

    async remove(where: Prisma.CategoryWhereUniqueInput) {
        return this.prisma.category.delete({
            where,
            include: {
                createdBy: true,
                places: true,
            },
        })
    }
}
