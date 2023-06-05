import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS_HTTP } from '../constants/messages';

function getError(key: string): {
  message: string;
  status: HttpStatus;
} {
  const error = ERRORS_HTTP[key];

  if (error) return error;

  return ERRORS_HTTP['ERROR'];
}

export class HttpErros extends HttpException {
  constructor(error_key: string) {
    const error = getError(error_key);

    super({data: null, ...error}, error.status);
  }
}
