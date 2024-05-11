import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
