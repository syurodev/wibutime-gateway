import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreateDTO } from './auth.dto/create-user.dto';
// import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  async onApplicationShutdown() {
    await this.authService.close();
  }

  async onModuleInit() {
    const requestPatterns: string[] = ['user.create', 'user.detail'];
    requestPatterns.forEach((pattern: string) => {
      this.authService.subscribeToResponseOf(pattern);
    });
    await this.authService.connect();
  }

  async createUser(userData: UserCreateDTO) {
    await this.authService
      .send('user.create', JSON.stringify(userData))
      .subscribe((res) => console.log(res));
  }

  async getUserById(id: number) {
    await this.authService
      .send('user.detail', id)
      .subscribe((res) => console.log(res));
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // handleCron() {
  //   this.authService
  //     .send('user.detail', 1)
  //     .subscribe((res) => console.log(res));
  // }
}
