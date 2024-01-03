import { Prisma, PrismaClient } from '@com/prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class CompanyService {
    constructor(
        @Inject('PRISMA_SERVICE_COMPANY')
        private prisma: CustomPrismaService<PrismaClient>,
    ) {}

    async create(data: Prisma.CompanyCreateInput) {
        return this.prisma.client.company.create({ data });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CompanyWhereUniqueInput;
        where?: Prisma.CompanyWhereInput;
        orderBy?: Prisma.CompanyOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.company.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                departments: {
                    include: {
                        positions: true,
                    },
                },
            },
        });
    }

    async findUniq(where: Prisma.CompanyWhereUniqueInput) {
        return this.prisma.client.company.findUniqueOrThrow({
            where,
            include: {
                departments: {
                    include: {
                        positions: true,
                    },
                },
            },
        });
    }

    async update(params: {
        where: Prisma.CompanyWhereUniqueInput;
        data: Prisma.CompanyUpdateInput;
    }) {
        return this.prisma.client.company.update({
            where: params.where,
            data: params.data,
            include: {
                departments: {
                    include: {
                        positions: true,
                    },
                },
            },
        });
    }

    async remove(where: Prisma.CompanyWhereInput) {
        return this.prisma.client.company.deleteMany({ where });
    }
}
