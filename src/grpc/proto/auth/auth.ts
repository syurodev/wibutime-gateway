// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.174.0
//   protoc               v5.26.1
// source: src/grpc/proto/auth/auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'AUTH_SERVICE_GRPC_PACKAGE';

export interface UserRegisterRequest {
  email: string;
  phone?: string | undefined;
  name: string;
  username?: string | undefined;
  password?: string | undefined;
  image?: string | undefined;
  imageKey?: string | undefined;
  provider?: string | undefined;
}

export interface UserRegisterResponse {
  status: number;
  message: string;
  data: UserDataResponse | undefined;
}

/** VERIFICATION EMAIL */
export interface VerificationEmailRequest {
  code: number;
  email: string;
}

/** RESET PASSWORD */
export interface ResetPasswordRequest {
  password: string;
  email: string;
}

/** FORGOT PASSWORD */
export interface ForgotPasswordRequest {
  email: string;
}

/** VERIFICATION FORGOT PASSWORD */
export interface VerificationForgotPasswordRequest {
  email: string;
  code: number;
}

/** CHANGE PASSWORD */
export interface ChangePasswordRequest {
  email: string;
}

/** VERIFICATION CHANGE PASSWORD */
export interface VerificationChangePasswordRequest {
  email: string;
  code: number;
}

/** CHANGE NEW PASSWORD */
export interface ChangeNewPasswordRequest {
  password: string;
  old_password: string;
  email: string;
}

/** LOGIN */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface FullTokenResponse {
  access_token: string;
  expires_in: string;
  refresh_token?: string;
}

export interface UserDataResponse {
  id: number;
  name: string;
  email: string;
  image: string;
  email_verified: boolean;
  coins: number;
  provider: string;
  username?: string | undefined;
  password?: string | undefined;
  backend_token?: FullTokenResponse | undefined;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  status: number;
  message: string;
  data: UserDataResponse | undefined;
}

export interface RefreshTokenRequest {
  id: number;
  email: string;
  name: string;
}

export interface AccessToken {
  access_token: string;
  expires_in: string;
}

export interface RefreshTokenResponse {
  status: number;
  message: string;
  data: AccessToken | undefined;
}

/** SEND VERIFICATION CODE */
export interface SendVerificationRequest {
  email: string;
  name: string;
}

export interface GoogleProfileName {
  familyName: string;
  givenName: string;
  middleName: string;
}

export interface GoogleProfileEmail {
  value: string;
  type: string;
}

export interface GoogleProfilePhoto {
  value: string;
}

export interface GoogleProfile {
  provider: string;
  id: string;
  displayName: string;
  username: string;
  name: GoogleProfileName | undefined;
  emails: GoogleProfileEmail[];
  photos: GoogleProfilePhoto[];
}

export interface EmptyResponse {
  status: number;
  message: string;
  data: string;
}

export const AUTH_SERVICE_GRPC_PACKAGE_PACKAGE_NAME =
  'AUTH_SERVICE_GRPC_PACKAGE';

export interface AuthGRPCServiceClient {
  login(request: LoginRequest): Observable<LoginResponse>;

  googleLogin(request: GoogleProfile): Observable<EmptyResponse>;

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;

  register(request: UserRegisterRequest): Observable<UserRegisterResponse>;

  sendVerification(request: SendVerificationRequest): Observable<EmptyResponse>;

  verificationEmail(
    request: VerificationEmailRequest,
  ): Observable<EmptyResponse>;

  forgotPassword(request: ForgotPasswordRequest): Observable<EmptyResponse>;

  verificationForgotPassword(
    request: VerificationForgotPasswordRequest,
  ): Observable<EmptyResponse>;

  resetPassword(request: ResetPasswordRequest): Observable<EmptyResponse>;

  changePassword(request: ChangePasswordRequest): Observable<EmptyResponse>;

  verificationChangePassword(
    request: VerificationChangePasswordRequest,
  ): Observable<EmptyResponse>;

  changeNewPassword(
    request: ChangeNewPasswordRequest,
  ): Observable<EmptyResponse>;
}

export interface AuthGRPCServiceController {
  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  googleLogin(
    request: GoogleProfile,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  refreshToken(
    request: RefreshTokenRequest,
  ):
    | Promise<RefreshTokenResponse>
    | Observable<RefreshTokenResponse>
    | RefreshTokenResponse;

  register(
    request: UserRegisterRequest,
  ):
    | Promise<UserRegisterResponse>
    | Observable<UserRegisterResponse>
    | UserRegisterResponse;

  sendVerification(
    request: SendVerificationRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  verificationEmail(
    request: VerificationEmailRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  verificationForgotPassword(
    request: VerificationForgotPasswordRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  changePassword(
    request: ChangePasswordRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  verificationChangePassword(
    request: VerificationChangePasswordRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;

  changeNewPassword(
    request: ChangeNewPasswordRequest,
  ): Promise<EmptyResponse> | Observable<EmptyResponse> | EmptyResponse;
}

export function AuthGRPCServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'login',
      'googleLogin',
      'refreshToken',
      'register',
      'sendVerification',
      'verificationEmail',
      'forgotPassword',
      'verificationForgotPassword',
      'resetPassword',
      'changePassword',
      'verificationChangePassword',
      'changeNewPassword',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthGRPCService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthGRPCService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_GRPC_SERVICE_NAME = 'AuthGRPCService';