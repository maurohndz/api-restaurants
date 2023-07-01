import { HttpException } from '@nestjs/common';
import { ERRORS_HTTP } from 'src/constants/messages';

export class HttpErros extends HttpException {
  constructor(data: { status: number; message: string }) {
    let error = data?.status && data?.message ? data : ERRORS_HTTP['ERROR'];
    
    super({data: null, ...error}, error.status);
  }
}
