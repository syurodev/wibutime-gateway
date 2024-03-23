import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './v1/auth/auth.module';
import { LightnovelModule } from './v1/lightnovel/lightnovel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    LightnovelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppV1Module {}
