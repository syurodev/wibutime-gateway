import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { VersionEnum } from 'src/common/enum/version-enum.common';
import { UserService } from './user.service';
import { BaseResponseData } from 'src/common/response/base.response.common';
import { UserStringMessageResponse } from 'src/common/response/message/user-string-message.response';
import { GetUserDetailResponse } from 'src/grpc/proto/user/user';

@Controller({
  version: VersionEnum.V1.toString(),
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Chi tiết user
  @Get('/:id')
  async userDetail(
    @Param('id') id: number,
    @Res() res: Response,
    @Query()
    query: { withRole: boolean; withPermission: boolean; withToken: boolean },
  ) {
    const response: BaseResponseData = new BaseResponseData();

    const result: GetUserDetailResponse = await this.userService.findOne(
      id.toString(),
      true,
      false,
      query.withRole,
      query.withPermission,
    );

    if (!result) {
      response.setMessage(
        HttpStatus.NOT_FOUND,
        UserStringMessageResponse.USER_NOT_FOUND,
      );
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(result);
    return res.status(HttpStatus.OK).send(response);
  }
}
