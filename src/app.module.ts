import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GrpcModule } from './grpc/grpc.module';
import { AuthV1Module } from './auth/v1/auth.module';
import { UserV1Module } from './user/v1/user.module';
import { LightnovelV1Module } from './lightnovel/v1/lightnovel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GrpcModule,
    AuthV1Module,
    UserV1Module,
    LightnovelV1Module,
  ],
})
export class AppModule {}
