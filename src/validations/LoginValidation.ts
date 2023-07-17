import { IsEmail, IsNotEmpty } from 'class-validator';
import { dictionary } from 'src/constants/dictionary';
import { errors } from 'src/constants/messages';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentials {
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
    message: errors.requiredField(dictionary['password']),
  })
  password: string;
}
