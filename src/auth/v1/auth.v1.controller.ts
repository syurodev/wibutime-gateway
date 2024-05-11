import { Controller, Get } from '@nestjs/common';

import { VersionEnum } from 'src/common/enum/version-enum.common';

@Controller({
  version: VersionEnum.V1.toString(),
  path: 'auth',
})
export class AuthV1Controller {
  @Get()
  sayHello() {
    return;
  }
}
