import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@user/prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupService {
    constructor(private prisma: CustomPrismaService<PrismaClient>) {}

    async create(data: Prisma.GroupCreateInput) {
        return this.prisma.client.group.create({
            data,
            include: {
                createdBy: true,
            },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.GroupWhereUniqueInput;
        where?: Prisma.GroupWhereInput;
        orderBy?: Prisma.GroupOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.group.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                permissions: true,
                createdBy: true,
            },
        });
    }

    async findUniq(where: Prisma.GroupWhereUniqueInput) {
        return this.prisma.client.group.findUniqueOrThrow({
            where,
            include: {
                permissions: true,
                createdBy: true,
            },
        });
    }

    async update(params: {
        where: Prisma.GroupWhereUniqueInput;
        data: Prisma.GroupUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.client.group.update({
            data,
            where,
            include: {
                permissions: true,
                createdBy: true,
            },
        });
    }

    async remove(where: Prisma.GroupWhereInput) {
        return this.prisma.client.group.deleteMany({ where });
    }
}
