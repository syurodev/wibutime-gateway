import { Module } from '@nestjs/common';
import { AuthV1Controller } from './auth.v1.controller';

@Module({
  controllers: [AuthV1Controller],
})
export class AuthV1Module {}
