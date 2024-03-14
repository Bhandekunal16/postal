import { Controller, Get } from '@nestjs/common';
import { PostalService } from './postal.service';

@Controller('postal')
export class PostalController {
  constructor(private readonly postalService: PostalService) {}

  @Get('get')
  async allPostalList() {
    return await this.postalService.allPostalList();
  }

  @Get('count')
  async count() {
    return await this.postalService.count();
  }
}
