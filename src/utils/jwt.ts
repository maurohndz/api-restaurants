import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';


const ERRORS = {
  TokenExpiredError: "TOKEN_EXPIRED",
  JsonWebTokenError: "TOKEN_ERROR",
  NotBeforeError: "TOKEN_ERROR",
};

export const sign = async (data) => {
  const _configService = new ConfigService();
  const { jwt_secret, session_time } = _configService.get('session');

  try {
    const token = await jwt.sign(data, jwt_secret, {
      expiresIn: `${session_time / 60000}m`,
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export const verify = async (token) => {
  const _configService = new ConfigService();
  const jwt_secret = _configService.get('session.jwt_secret');

  try {
    const decoded = await jwt.verify(token, jwt_secret);

    return decoded;
  } catch ({ name }) {
    throw ERRORS[name];
  }
};
