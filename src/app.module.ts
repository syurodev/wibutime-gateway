import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GrpcModule } from './grpc/grpc.module';
import { AuthV1Module } from './auth/v1/auth.v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GrpcModule,
    //Auth
    AuthV1Module,
  ],
})
export class AppModule {}
