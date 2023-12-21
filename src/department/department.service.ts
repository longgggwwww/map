import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class DepartmentService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.DepartmentCreateInput) {
        return this.prisma.department.create({
            data,
            include: {
                company: true,
                positions: true,
            },
        })
    }

    async findAll(params: {
        skip?: number
        take?: number
        cursor?: Prisma.DepartmentWhereUniqueInput
        where?: Prisma.DepartmentWhereInput
        orderBy?: Prisma.DepartmentOrderByWithRelationInput
    }) {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.department.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                company: true,
                positions: true,
            },
        })
    }

    async findUniq(where: Prisma.DepartmentWhereUniqueInput) {
        return this.prisma.department.findUniqueOrThrow({
            where,
            include: {
                company: true,
                positions: true,
            },
        })
    }

    async update(params: {
        where: Prisma.DepartmentWhereUniqueInput
        data: Prisma.DepartmentUpdateInput
    }) {
        const { where, data } = params
        return this.prisma.department.update({
            data,
            where,
            include: {
                company: true,
                positions: true,
            },
        })
    }

    async removeMany(where: Prisma.DepartmentWhereInput) {
        return this.prisma.department.deleteMany({
            where,
        })
    }

    async remove(where: Prisma.DepartmentWhereUniqueInput) {
        return this.prisma.department.delete({
            where,
            include: {
                company: true,
                positions: true,
            },
        })
    }
}
