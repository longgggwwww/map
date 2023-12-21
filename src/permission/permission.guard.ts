import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission } from "@prisma/client";
import { PERMISSIONS_KEY } from "./decoratos/permission.decorator";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<
            Permission[]
        >(PERMISSIONS_KEY, [ctx.getHandler(), ctx.getClass()]);

        if (!requiredPermissions) {
            return true;
        }

        const { user } = ctx.switchToHttp().getRequest();
        return requiredPermissions.some((permission) =>
            user.permissions.includes(permission),
        );
    }
}
