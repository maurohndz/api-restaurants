import { HttpStatus } from '@nestjs/common';
import { SUCCESS_HTTP } from 'src/constants/messages';

export class HttpResponse {
  data = null;
  status = null;
  mesagge = null;

  constructor(data: any, key: string = 'SUCCESS') {
    const { message, status } = this.getInfo(key);

    this.data = data;
    this.mesagge = message;
    this.status = status;
  }

  private getInfo(key: string): {
    message: string;
    status: HttpStatus;
  } {
    return SUCCESS_HTTP[key];
  }

  public getResponse(): {
    data: any;
    message: string;
    status: HttpStatus;
  } {
    return {
      data: this.data,
      status: this.status,
      message: this.mesagge,
    };
  }
}
