import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { ConfigGRPCNameEnum } from 'src/common/enum/config-grpc-name-enum.common';
import {
  CategoriesResponse,
  LIGHTNOVEL_CATEGORY_GRPC_SERVICE_NAME,
  LightnovelCategoryGRPCServiceClient,
} from 'src/grpc/proto/lightnovel/category';
import {
  CreateLightnovelRequest,
  LIGHTNOVEL_GRPC_SERVICE_NAME,
  LightnovelGRPCServiceClient,
} from 'src/grpc/proto/lightnovel/lightnovel';

@Injectable()
export class LightnovelService {
  private gRPCLightnovelService: LightnovelGRPCServiceClient;
  private gRPCLightnovelCategoryService: LightnovelCategoryGRPCServiceClient;

  constructor(
    @Inject(ConfigGRPCNameEnum.LIGHTNOVEL)
    private readonly gRPCLightnovelClient: ClientGrpc,
    @Inject(ConfigGRPCNameEnum.LIGHTNOVEL_CATEGORY)
    private readonly gRPCLightnovelCategoryClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    //gRPC
    this.gRPCLightnovelService =
      this.gRPCLightnovelClient.getService<LightnovelGRPCServiceClient>(
        LIGHTNOVEL_GRPC_SERVICE_NAME,
      );
    this.gRPCLightnovelCategoryService =
      this.gRPCLightnovelCategoryClient.getService<LightnovelCategoryGRPCServiceClient>(
        LIGHTNOVEL_CATEGORY_GRPC_SERVICE_NAME,
      );
  }

  async createLightnovel(data: any, metadata: Metadata) {
    const request: CreateLightnovelRequest = {
      categories: data.categories ?? [],
      name: data.name ?? '',
      other_names: data.other_names,
      summary: JSON.stringify(data.summary),
      user_id: data.user_id,
      author: data.author,
      illustrator: data.illustrator,
      image: data.image,
      note: JSON.stringify(data.note),
      translation_group_id: data.translation_group_id,
      url_id: '',
    };

    return await lastValueFrom(
      await this.gRPCLightnovelService.createLightnovel(request, metadata),
    );
  }

  async categories(): Promise<CategoriesResponse> {
    return await lastValueFrom(
      await this.gRPCLightnovelCategoryService.getCategories({}),
    );
  }
}
