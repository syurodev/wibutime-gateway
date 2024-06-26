import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDataResponse } from 'src/grpc/proto/auth/auth';
import { UserService } from 'src/user/v1/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      //Yêu cầu token cho mỗi request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('CONFIG_JWT_SECRET'),
    });
  }

  async validate(payload: UserDataResponse | null) {
    console.log(payload);
    return payload.backend_token.access_token
      ? payload.backend_token.access_token
      : null;
  }
}
