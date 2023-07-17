import { IsNotEmpty } from 'class-validator';
import { dictionary } from 'src/constants/dictionary';
import { errors } from 'src/constants/messages';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenu {
  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['name']),
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  decription: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  status?: boolean;
}
