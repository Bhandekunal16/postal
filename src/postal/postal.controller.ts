import { Controller } from '@nestjs/common';
import { PostalService } from './postal.service';

@Controller('postal')
export class PostalController {
  constructor(private readonly postalService: PostalService) {}
}
