import { IsNotEmpty } from 'class-validator';
import { dictionary } from 'src/constants/dictionary';
import { errors } from 'src/constants/messages';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployee {
  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['id']),
  })
  id: string;

  @ApiProperty()
  @IsNotEmpty({
    message: errors.requiredField(dictionary['name']),
  })
  name: string;

  @ApiProperty({
    nullable: true,
  })
  @IsNotEmpty({
    message: errors.requiredField(dictionary['last_name']),
  })
  last_name: string;
}
