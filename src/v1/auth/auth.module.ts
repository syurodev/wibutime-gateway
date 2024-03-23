import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [KafkaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
