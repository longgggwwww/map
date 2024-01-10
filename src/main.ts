import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { static as static_ } from 'express';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { TrimPipe } from './trim.pipe';

/**
 * Fix BigInt Prisma Error
 * @link https://github.com/prisma/studio/issues/614
 */
declare global {
  interface BigInt {
    toJSON(): string;
  }
}
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', static_('uploads'));
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
    new TrimPipe(),
  );
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(app.get(ConfigService).get<number>('PORT', 3000));
}
bootstrap();
