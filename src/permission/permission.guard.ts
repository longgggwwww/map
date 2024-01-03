import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Permission } from '@user/prisma/client';
import { Request } from 'express';
import { PERMISSIONS_KEY } from './decoratos/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private config: ConfigService,
        private jwtService: JwtService,
    ) {}

    canActivate(ctx: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<
            Permission[]
        >(PERMISSIONS_KEY, [ctx.getHandler(), ctx.getClass()]);

        if (!requiredPermissions) {
            return true;
        }

        const { headers } = ctx.switchToHttp().getRequest<Request>();
        const accessToken = headers.authorization?.split('Bearer ')[1];
        const payload = this.jwtService.verify(accessToken, {
            secret: this.config.get('ACCESS_TOKEN_SECRET'),
        });
        const permissions = payload.permissions;
        return requiredPermissions.some((permission) =>
            permissions.includes(permission),
        );
    }
}
