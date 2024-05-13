import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { RefreshJwtStrategy } from 'src/common/jwt/jwt.refresh';
import { UserService } from 'src/user/v1/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, RefreshJwtStrategy],
})
export class AuthV1Module {}
