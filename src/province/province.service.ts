import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@unit/prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class ProvinceService {
    constructor(private prisma: CustomPrismaService<PrismaClient>) {}

    async create(data: Prisma.ProvinceCreateInput) {
        return this.prisma.client.province.create({ data });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProvinceWhereUniqueInput;
        where?: Prisma.ProvinceWhereInput;
        orderBy?: Prisma.ProvinceOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.province.findMany({
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
        return this.prisma.client.province.findUniqueOrThrow({
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
        return this.prisma.client.province.update({
            where,
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

    async removeMany(where: Prisma.ProvinceWhereInput) {
        return this.prisma.client.province.deleteMany({
            where,
        });
    }

    async remove(where: Prisma.ProvinceWhereUniqueInput) {
        return this.prisma.client.province.delete({
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
