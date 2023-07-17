import { IsEmail, IsNotEmpty } from 'class-validator';
import { dictionary } from 'src/constants/dictionary';
import { errors } from 'src/constants/messages';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployee {
  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['name']),
  })
  name: string;

  @ApiProperty()
  last_name: string;

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

  @ApiProperty()
  rol_id?: string | null;
}
