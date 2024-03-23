import { Controller, Get, Param } from '@nestjs/common';
import { VersionEnum } from 'src/utils.common/utils.enum.common/utils.version.enum';
import { LightnovelService } from './lightnovel.service';

@Controller({
  version: VersionEnum.V1.toString(),
  path: 'lightnovel',
})
export class LightnovelController {
  constructor(private readonly lightnovelService: LightnovelService) {}

  @Get('/:id')
  async getLightnovelDetail(@Param('id') id: number) {
    return await this.lightnovelService.getLightnovelDetail(id);
  }
}
