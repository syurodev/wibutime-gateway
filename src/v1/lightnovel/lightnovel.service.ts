import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
// import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LightnovelService {
  constructor(
    @Inject('LIGHTNOVEL_SERVICE')
    private readonly lightnovelService: ClientKafka,
  ) {}

  async onApplicationShutdown() {
    await this.lightnovelService.close();
  }

  async onModuleInit() {
    const requestPatterns: string[] = ['lightnovel.detail'];
    requestPatterns.forEach((pattern: string) => {
      this.lightnovelService.subscribeToResponseOf(pattern);
    });
    await this.lightnovelService.connect();
  }

  async getLightnovelDetail(id) {
    return await this.lightnovelService
      .send('lightnovel.detail', id)
      .subscribe((res) => console.log(res));
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // handleCron() {
  //   this.lightnovelService
  //     .send('user.detail', 1)
  //     .subscribe((res) => console.log(res));
  // }
}
