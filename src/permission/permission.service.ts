import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@user/prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class PermissionService {
    constructor(private prisma: CustomPrismaService<PrismaClient>) {}

    async create(data: Prisma.PermissionCreateInput) {
        return this.prisma.client.permission.create({
            data,
            include: {
                group: true,
                roles: true,
                createdBy: true,
            },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PermissionWhereUniqueInput;
        where?: Prisma.PermissionWhereInput;
        orderBy?: Prisma.PermissionOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.permission.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                group: true,
                roles: true,
                createdBy: true,
            },
        });
    }

    async findUniq(where: Prisma.PermissionWhereUniqueInput) {
        return this.prisma.client.permission.findUniqueOrThrow({
            where,
            include: {
                group: true,
                roles: true,
                createdBy: true,
            },
        });
    }

    async update(params: {
        where: Prisma.PermissionWhereUniqueInput;
        data: Prisma.PermissionUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.client.permission.update({
            data,
            where,
            include: {
                group: true,
                roles: true,
                createdBy: true,
            },
        });
    }

    async removeMany(where: Prisma.PermissionWhereInput) {
        return this.prisma.client.permission.deleteMany({
            where,
        });
    }

    async remove(where: Prisma.PermissionWhereUniqueInput) {
        return this.prisma.client.permission.delete({
            where,
            include: {
                group: true,
                roles: true,
                createdBy: true,
            },
        });
    }
}
