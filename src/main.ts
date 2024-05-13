import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';

import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ExceptionResponseDetail } from './common/exception/exception.common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = 'Asia/Ho_Chi_Minh';

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api'); // Thiết lập tiền tố toàn cầu là /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            Object.values(validationErrors[0].constraints)[0],
          ),
          HttpStatus.OK,
        );
      },
    }),
  );

  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000,
    }),
  );

  await app.listen(process.env.CONFIG_GATEWAY_PORT || 1000);
  console.log('Gateway is running on port: ' + process.env.CONFIG_GATEWAY_PORT);
}
bootstrap();
