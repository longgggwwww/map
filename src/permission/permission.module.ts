import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './permission.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [PermissionController],
    providers: [
        PermissionService,
        JwtService,
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
    ],
})
export class PermissionModule {}
