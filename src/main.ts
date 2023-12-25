import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { static as static_ } from 'express'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'

/**
 * Fix BigInt Prisma Error
 * @link https://github.com/prisma/studio/issues/614
 */
declare global {
    interface BigInt {
        toJSON(): string
    }
}
BigInt.prototype.toJSON = function (): string {
    return this.toString()
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use('/uploads', static_('uploads'))
    app.enableCors()
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
    const confService = app.get(ConfigService)
    await app.listen(confService.get<number>('PORT', 3000))
}
bootstrap()
