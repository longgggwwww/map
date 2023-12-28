import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './decoratos/role.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JwtService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { headers } = ctx.switchToHttp().getRequest<Request>();
    const accessToken = headers.authorization.split('Bearer ')[1];
    const payload = this.jwt.verify(accessToken);
    console.log('debug', payload);
    return false;
    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
