import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostalService } from './postal.service';
import { search } from './dto/search';

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

  @Get('count/state')
  async stateWiseCount() {
    return await this.postalService.stateWiseCount();
  }

  @Get('getall/:property/:value')
  async matchWithProperty(
    @Param('property') property: string,
    @Param('value') value: string,
  ) {
    return await this.postalService.matchWithProperty(property, value);
  }

  @Post('search')
  async matchWithName(@Body() body: search) {
    return await this.postalService.matchWithName(body);
  }
}
