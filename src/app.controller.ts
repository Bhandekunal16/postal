import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonService } from './common/common.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly common: CommonService,
  ) {}

  @Get()
  hello() {
    return 'hello world';
  }

  @Get('/test')
  getHello() {
    return this.common
      .readCsv()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error reading CSV:', error);
      });
  }
}
