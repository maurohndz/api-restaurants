import { IsEmail, IsNotEmpty } from "class-validator";
import { dictionary } from "src/constants/dictionary";
import { errors } from "src/constants/messages";

export class LoginValidation {
  @IsNotEmpty({
    message: errors.requiredField(dictionary['email']),
  })
  @IsEmail({}, {
    message: errors.invalidFormat(dictionary['email']),
  })
  email: string;

  @IsNotEmpty({
    message: errors.requiredField(dictionary['password']),
  })
  password: string;
}