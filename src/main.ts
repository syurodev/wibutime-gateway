import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  LogLevel,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as moment from 'moment-timezone';
import { ExceptionResponseDetail } from './utils.common/utils.exception.common/utils.exception.common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.CONFIG_LOGGER_LEVEL.split(',').filter(
      (level: string): level is LogLevel => {
        return ['log', 'error', 'warn', 'debug', 'verbose'].includes(
          level as LogLevel,
        );
      },
    ),
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api'); // Thiết lập tiền tố toàn cầu là /api

  app.useGlobalPipes(
    new ValidationPipe({
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

  const config = new DocumentBuilder()
    .setTitle('WIBUTIME API')
    .setDescription(``)
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.enableCors();

  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'auth-consumer',
  //     },
  //   },
  // });

  app.startAllMicroservices();

  moment.tz.setDefault('Asia/Ho_Chi_Minh');

  await app.listen(process.env.SERVICE_PORT, '0.0.0.0');

  console.log(`Application is run ${await app.getUrl()}`);

  console.log(`==============================ENV===============
    SERVICE_PORT:${process.env.SERVICE_PORT},

==============================ENV==============================`);
}

bootstrap();
