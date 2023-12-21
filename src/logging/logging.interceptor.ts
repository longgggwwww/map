import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Request } from 'express'
import { PrismaService } from 'nestjs-prisma'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly prisma: PrismaService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(
            map(async (data) => {
                const { user, path, method, ip } = context
                    .switchToHttp()
                    .getRequest<Request>()
                if (method !== 'GET') {
                    await this.prisma.log.create({
                        data: {
                            user: {
                                connect: {
                                    id: (user as { userId: number }).userId,
                                },
                            },
                            method,
                            url: path,
                            time: Date.now() - now,
                            ip,
                        },
                    })
                }
                return data
            }),
        )
    }
}
