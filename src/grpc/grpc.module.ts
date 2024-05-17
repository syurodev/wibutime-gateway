import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ConfigGRPCNameEnum } from 'src/common/enum/config-grpc-name-enum.common';
import { AUTH_SERVICE_GRPC_PACKAGE_PACKAGE_NAME } from './proto/auth/auth';
import { USER_GRPC_PACKAGE_NAME } from './proto/user/user';
import { LIGHTNOVEL_SERVICE_GRPC_PACKAGE_NAME } from './proto/lightnovel/lightnovel';
import { LIGHTNOVEL_CATEGORY_SERVICE_GRPC_PACKAGE_NAME } from './proto/lightnovel/category';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: ConfigGRPCNameEnum.AUTH,
        transport: Transport.GRPC,
        options: {
          package: AUTH_SERVICE_GRPC_PACKAGE_PACKAGE_NAME,
          protoPath: join(__dirname, '/proto/auth/auth.proto'),
          url: `${process.env.CONFIG_AUTH_SERVICE_GRPC_HOST}:${process.env.CONFIG_AUTH_SERVICE_GRPC_PORT}`,
          loader: {
            keepCase: true,
          },
        },
      },
      {
        name: ConfigGRPCNameEnum.USER,
        transport: Transport.GRPC,
        options: {
          package: USER_GRPC_PACKAGE_NAME,
          protoPath: join(__dirname, '/proto/user/user.proto'),
          url: `${process.env.CONFIG_AUTH_SERVICE_GRPC_HOST}:${process.env.CONFIG_AUTH_SERVICE_GRPC_PORT}`,
          loader: {
            keepCase: true,
          },
        },
      },
      {
        name: ConfigGRPCNameEnum.LIGHTNOVEL,
        transport: Transport.GRPC,
        options: {
          package: LIGHTNOVEL_SERVICE_GRPC_PACKAGE_NAME,
          protoPath: join(__dirname, '/proto/lightnovel/lightnovel.proto'),
          url: `${process.env.CONFIG_LIGHTNOVEL_SERVICE_GRPC_HOST}:${process.env.CONFIG_LIGHTNOVEL_SERVICE_GRPC_PORT}`,
          loader: {
            keepCase: true,
          },
        },
      },
      {
        name: ConfigGRPCNameEnum.LIGHTNOVEL_CATEGORY,
        transport: Transport.GRPC,
        options: {
          package: LIGHTNOVEL_CATEGORY_SERVICE_GRPC_PACKAGE_NAME,
          protoPath: join(__dirname, '/proto/lightnovel/category.proto'),
          url: `${process.env.CONFIG_LIGHTNOVEL_SERVICE_GRPC_HOST}:${process.env.CONFIG_LIGHTNOVEL_SERVICE_GRPC_PORT}`,
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GrpcModule {}
