import { IsEmail, IsNotEmpty } from 'class-validator';
import { dictionary } from '../constants/dictionary';
import { errors } from '../constants/messages';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurant {
  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['email']),
  })
  @IsEmail(
    {},
    {
      message: errors.invalidFormat(dictionary['email']),
    },
  )
  email: string;

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

  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['password']),
  })
  password: string;
}
