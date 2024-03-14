import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('getall/:property/:value')
  async matchWithProperty(
    @Param('property') property: string,
    @Param('value') value: string,
  ) {
    return await this.postalService.matchWithProperty(property, value);
  }
}
