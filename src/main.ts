import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { json } from 'express';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '200mb' }));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalInterceptors(new LoggingInterceptor(new PrismaService()));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const cfgService = app.get(ConfigService);
  await app.listen(cfgService.get<number>('PORT', 3000));
}
bootstrap();
