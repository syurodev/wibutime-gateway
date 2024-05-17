import { Module } from '@nestjs/common';
import { LightnovelController } from './lightnovel.controller';
import { LightnovelService } from './lightnovel.service';

@Module({
  controllers: [LightnovelController],
  providers: [LightnovelService],
})
export class LightnovelV1Module {}
