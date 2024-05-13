import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { ConfigGRPCNameEnum } from 'src/common/enum/config-grpc-name-enum.common';
import {
  AUTH_GRPC_SERVICE_NAME,
  AuthGRPCServiceClient,
  EmptyResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserRegisterRequest,
} from 'src/grpc/proto/auth/auth';

@Injectable()
export class AuthService {
  private gRPCAuthService: AuthGRPCServiceClient;

  constructor(
    @Inject(ConfigGRPCNameEnum.AUTH)
    private readonly gRPCClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    //gRPC
    this.gRPCAuthService = this.gRPCClient.getService<AuthGRPCServiceClient>(
      AUTH_GRPC_SERVICE_NAME,
    );
  }

  // Kafka
  // async googleLogin(data: GoogleProfile) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.kafkaClient
  //       .send(KafkaTopic.GOOGLE_LOGIN, JSON.stringify(JSON.stringify(data)))
  //       .subscribe({
  //         next: (res) => {
  //           resolve(res); // Trả về kết quả thành công
  //         },
  //         error: (err) => {
  //           reject(err); // Trả về lỗi nếu có
  //         },
  //       });
  //   });
  // }

  async register(userData: UserRegisterRequest) {
    return await lastValueFrom(await this.gRPCAuthService.register(userData));
  }

  async login(data: any) {
    return await lastValueFrom(
      await this.gRPCAuthService.login({
        username: data.username,
        password: data.password,
      }),
    );
  }

  async sendVerificationEmail(
    email: string,
    name: string,
  ): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.sendVerification({
        email,
        name,
      }),
    );
  }

  async verificationEmail(email: string, code: number): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.verificationEmail({
        code,
        email,
      }),
    );
  }

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.refreshToken({
        id: data.id,
        email: data.email,
        name: data.name,
      }),
    );
  }

  async forgotPassword(email: string): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.forgotPassword({
        email,
      }),
    );
  }

  async verificationForgotPassword(
    email: string,
    code: number,
  ): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.verificationForgotPassword({
        email,
        code,
      }),
    );
  }

  async resetPassword(email: string, password: string): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.resetPassword({
        password,
        email,
      }),
    );
  }

  async changePassword(email: string): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.changePassword({
        email,
      }),
    );
  }

  async verificationChangePassword(
    email: string,
    code: number,
  ): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.verificationChangePassword({
        email,
        code,
      }),
    );
  }

  async changeNewPassword(
    email: string,
    oldPassword: string,
    password: string,
  ): Promise<EmptyResponse> {
    return await lastValueFrom(
      await this.gRPCAuthService.changeNewPassword({
        password,
        old_password: oldPassword,
        email,
      }),
    );
  }
}
