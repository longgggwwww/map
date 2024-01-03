import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@user/prisma/client';
import * as bcrypt from 'bcrypt';
import { CustomPrismaService } from 'nestjs-prisma';
import { ChangePasswordDto } from './dto/change-pass-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: CustomPrismaService<PrismaClient>) {}

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.client.user.create({
            data,
            include: {
                profile: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                profile: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    async findUniq(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.client.user.findUniqueOrThrow({
            where,
            include: {
                profile: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.client.user.update({
            where,
            data,
            include: {
                profile: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    async remove(where: Prisma.UserWhereInput) {
        return this.prisma.client.user.deleteMany({ where });
    }

    async updateMany(params: {
        where: Prisma.UserWhereInput;
        data: Prisma.UserUpdateManyArgs;
    }) {
        return this.prisma.client.user.updateMany({
            where: params.where,
            data: params.data,
        });
    }

    async changePassword(params: {
        where: Prisma.UserWhereUniqueInput;
        data: ChangePasswordDto;
    }) {
        const { where, data } = params;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.newPassword, salt);
        return this.prisma.client.user.update({
            where,
            data: {
                password: hash,
            },
            include: {
                profile: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    async setRole(userIds: number[], roleId: number) {
        console.log(userIds, roleId);
        for await (const id of userIds) {
            this.prisma.client.user.update({
                where: {
                    id,
                },
                data: {
                    roles: {
                        connect: [
                            {
                                id: roleId,
                            },
                        ],
                    },
                },
            });
        }
        return true;
    }
}
