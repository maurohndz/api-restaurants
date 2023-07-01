import * as jwt from 'jsonwebtoken';
import { ERRORS_HTTP } from 'src/constants/messages';

const ERRORS = {
  TokenExpiredError: 'TOKEN_EXPIRED',
  JsonWebTokenError: 'TOKEN_ERROR',
  NotBeforeError: 'TOKEN_ERROR',
};

export const sign = async (data) => {
  const jwt_secret = process.env['JWT_SECRET'] || null;
  const session_time: number = parseInt(process.env['SESSION_TIME']) || 600000;

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
  const jwt_secret = process.env['JWT_SECRET'] || null;

  try {
    const decoded = await jwt.verify(token, jwt_secret);

    return decoded;
  } catch ({ name }) {
    let error_key = ERRORS[name];
    throw ERRORS_HTTP[error_key];
  }
};
