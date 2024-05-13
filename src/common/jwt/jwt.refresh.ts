import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDataResponse } from 'src/grpc/proto/auth/auth';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    // private readonly userService: UserService,
  ) {
    super({
      //Yêu cầu token cho mỗi request
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.get('CONFIG_JWT_REFRESH_TOKEN'),
    });
  }

  async validate(payload: UserDataResponse | null) {
    return payload ? payload : null;
  }
}
