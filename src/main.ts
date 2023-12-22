import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { json, static as static_ } from 'express'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use('uploads', static_('uploads'))
    app.enableCors()
    app.use(json({ limit: '200mb' }))
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
    const confService = app.get(ConfigService)
    await app.listen(confService.get<number>('PORT', 3000))
}
bootstrap()
