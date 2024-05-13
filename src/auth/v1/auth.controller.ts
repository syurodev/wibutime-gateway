import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { VersionEnum } from 'src/common/enum/version-enum.common';
import { GoogleAuthGuard } from 'src/guard/google.guard';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from 'src/guard/jwt.refresh.guard';
import { BaseResponseData } from 'src/common/response/base.response.common';
import { UserRegisterResponse } from 'src/grpc/proto/auth/auth';

@Controller({
  version: VersionEnum.V1.toString(),
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Data -> GoogleAuthGuard -> GoogleStrategy -> handleGoogleRedirect
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { msg: 'google login' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Req() req: Request) {
    return req.user || null;
  }

  @Post('/login')
  async handleLogin(@Body() body: any, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).send(await this.authService.login(body));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/register')
  async handleRegister(@Body() userData: any, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .send(await this.authService.register(userData));
  }

  @Post('/refresh') //refresh token
  @UseGuards(RefreshJwtGuard)
  async handleRefreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).send(
        await this.authService.refreshToken({
          email: req.user.email,
          id: req.user.id,
          name: req.user.name,
        }),
      );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/send-verification-email')
  async handleSendVerificationEmail(
    @Body() body: { email: string; name: string },
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(
          await this.authService.sendVerificationEmail(body.email, body.name),
        );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/verification-email')
  async handleVerificationEmail(@Body() body: any, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.authService.verificationEmail(body.email, body.code));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/forgot-password')
  async handleForgotPassword(@Body() body: any, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.authService.forgotPassword(body.email));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/verification-forgot-password')
  async handleVerificationForgotPassword(
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(
          await this.authService.verificationForgotPassword(
            body.email,
            body.code,
          ),
        );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/reset-password')
  async handleResetPassword(@Body() body: any, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.authService.resetPassword(body.email, body.password));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/change-password')
  async handleChangePassword(@Body() body: any, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.authService.changePassword(body.email));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/verification-change-password')
  async handleVerificationChangePassword(
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(
          await this.authService.verificationChangePassword(
            body.email,
            body.code,
          ),
        );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/change-new-password')
  async handleChangeNewPassword(@Body() body: any, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(
          await this.authService.changeNewPassword(
            body.email,
            body.oldPassword,
            body.password,
          ),
        );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
