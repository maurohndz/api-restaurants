import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

// const ERRORS = {
//   TokenExpiredError: "TOKEN_EXPIRED",
//   JsonWebTokenError: "TOKEN_ERROR",
//   NotBeforeError: "TOKEN_ERROR",
// };

@Injectable()
export class Jwt {
  constructor(private configService: ConfigService) {}

  async sing(data: any) {
    try {
      const pop = this.configService.get('session');
      console.log(pop)
      /*const token = await jwt.sign(data, pop, {
        expiresIn: `${session_time / 60000}m`,
      });*/
    } catch (error) {}
  }

  async verify() {}
}
// const jwt_secret = process.env.JWT_SECRET || ;

// export const sign = async (data) => {
//   try {
//     const token = await jwt.sign(data, jwt_secret, {
//       expiresIn: `${session_time / 60000}m`,
//     });

//     return token;
//   } catch (error) {
//     throw error;
//   }
// };

// export const verify = async (token) => {
//   try {
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET);

//     return decoded;
//   } catch ({ name }) {
//     throw ERRORS[name];
//   }
// };
