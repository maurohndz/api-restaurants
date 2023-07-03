import { IsEmail, IsNotEmpty } from 'class-validator';
import { dictionary } from '../constants/dictionary';
import { errors } from '../constants/messages';

export class UpdateRestaurantValidation {
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

  @IsNotEmpty({
    message: errors.requiredField(dictionary['name']),
  })
  name: string;

  @IsNotEmpty({
    message: errors.requiredField(dictionary['description']),
  })
  description: string;

  @IsNotEmpty({
    message: errors.requiredField(dictionary['address']),
  })
  address: string;

  schedule?: string[];

  images?: string[];

  phone?: string[];

  type_food?: string[];
}
