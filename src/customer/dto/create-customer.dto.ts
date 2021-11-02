import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  email: string;
}
