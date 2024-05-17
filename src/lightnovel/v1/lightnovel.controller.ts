import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { VersionEnum } from 'src/common/enum/version-enum.common';
import { LightnovelService } from './lightnovel.service';
import { Metadata } from '@grpc/grpc-js';
import { extractTokenFromHttpRequestAndAddToGrpcMetadata } from 'src/common/grpc/add-token-to-grpc-metadata';

@Controller({
  version: VersionEnum.V1.toString(),
  path: 'lightnovels',
})
export class LightnovelController {
  constructor(private readonly lightnovelService: LightnovelService) {}

  // @UseGuards(JwtGuard)
  @Post('/create-lightnovel')
  async createLightnovel(
    @Req() req: Request,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const metadata: Metadata =
      extractTokenFromHttpRequestAndAddToGrpcMetadata(req);
    const result = await this.lightnovelService.createLightnovel(
      body,
      metadata,
    );
    return res.status(HttpStatus.OK).send(result);
  }

  @Get('/categories')
  async categories(@Req() req: Request, @Res() res: Response) {
    console.log(req.headers.authorization);
    return res
      .status(HttpStatus.OK)
      .send(await this.lightnovelService.categories());
  }
}
