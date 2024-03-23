import {
  Body,
  Controller,
  Get,
  Param,
  // Inject,
  // OnModuleInit,
  Post,
} from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { VersionEnum } from 'src/utils.common/utils.enum.common/utils.version.enum';
import { UserCreateDTO } from './auth.dto/create-user.dto';

@Controller({
  version: VersionEnum.V1.toString(),
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.authService.getUserById(+id);
  }

  @Post('/create-user')
  async createUser(@Body() userData: UserCreateDTO) {
    return await this.authService.createUser(userData);
  }
}
