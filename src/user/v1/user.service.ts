import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConfigGRPCNameEnum } from 'src/common/enum/config-grpc-name-enum.common';
import {
  GetUserDetailResponse,
  USER_GRPC_SERVICE_NAME,
  userGRPCServiceClient,
} from 'src/grpc/proto/user/user';

@Injectable()
export class UserService {
  private gRPCUserService: userGRPCServiceClient;

  constructor(
    @Inject(ConfigGRPCNameEnum.USER)
    private readonly gRPCClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    //gRPC
    this.gRPCUserService = this.gRPCClient.getService<userGRPCServiceClient>(
      USER_GRPC_SERVICE_NAME,
    );
  }

  async findOne(
    slug: string,
    useId: boolean = false,
    withPassword: boolean = false,
    withRole: boolean = false,
    withPermission: boolean = false,
  ): Promise<GetUserDetailResponse> {
    if (!slug) return null;

    return await lastValueFrom(
      await this.gRPCUserService.getUserDetail({
        slug,
        useId,
        withPassword,
        withRole,
        withPermission,
      }),
    );
  }
}
