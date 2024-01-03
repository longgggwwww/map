import { PrismaClient as ComPrismaClient } from '@com/prisma/client';
import { PrismaClient as LogPrismaClient } from '@log/prisma/client';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaClient as UnitPrismaClient } from '@unit/prisma/client';
import { PrismaClient as UserPrismaClient } from '@user/prisma/client';
import { CustomPrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { GroupModule } from './group/group.module';
import { PermissionModule } from './permission/permission.module';
import { ProvinceModule } from './province/province.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CustomPrismaModule.forRoot({
            isGlobal: true,
            name: 'PRISMA_SERVICE_USER',
            client: new UserPrismaClient(),
        }),
        CustomPrismaModule.forRoot({
            isGlobal: true,
            name: 'PRISMA_SERVICE_COMPANY',
            client: new ComPrismaClient(),
        }),
        CustomPrismaModule.forRoot({
            isGlobal: true,
            name: 'PRISMA_SERVICE_UNIT',
            client: new UnitPrismaClient(),
        }),
        CustomPrismaModule.forRoot({
            isGlobal: true,
            name: 'PRISMA_SERVICE_LOG',
            client: new LogPrismaClient(),
        }),
        PermissionModule,
        RoleModule,
        ProvinceModule,
        CompanyModule,
        UserModule,
        AuthModule,
        CategoryModule,
        GroupModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ConfigService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
