import { PrismaClient } from '@log/prisma/client';
import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { CustomPrismaService } from 'nestjs-prisma';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject('PRISMA_SERVICE_LOG')
        private prisma: CustomPrismaService<PrismaClient>,
    ) {}

    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            map(async (data) => {
                const { user, path, method, ip } = ctx
                    .switchToHttp()
                    .getRequest<Request>();

                if (user && method !== 'GET') {
                    await this.prisma.client.log.create({
                        data: {
                            userId: (user as { userId: number }).userId,
                            time: Date.now() - now,
                            url: path,
                            method,
                            ip,
                        },
                    });
                }
                return data;
            }),
        );
    }
}
