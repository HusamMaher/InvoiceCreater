import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  id?: number;
  description?: string;
  name?: string;
  price?: number;
}
