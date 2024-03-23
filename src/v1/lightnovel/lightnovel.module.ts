import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { LightnovelService } from './lightnovel.service';
import { LightnovelController } from './lightnovel.controller';

@Module({
  imports: [KafkaModule],
  controllers: [LightnovelController],
  providers: [LightnovelService],
})
export class LightnovelModule {}
