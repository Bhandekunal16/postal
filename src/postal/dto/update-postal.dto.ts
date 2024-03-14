import { PartialType } from '@nestjs/mapped-types';
import { CreatePostalDto } from './create-postal.dto';

export class UpdatePostalDto extends PartialType(CreatePostalDto) {}
