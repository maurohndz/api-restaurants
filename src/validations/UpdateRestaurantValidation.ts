import { IsNotEmpty } from 'class-validator';
import { dictionary } from '../constants/dictionary';
import { errors } from '../constants/messages';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurant {
  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['name']),
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['description']),
  })
  description: string;

  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['address']),
  })
  address: string;

  @ApiProperty()
  schedule?: string[];

  @ApiProperty()
  images?: string[];

  @ApiProperty()
  phone?: string[];

  @ApiProperty()
  type_food?: string[];
}
