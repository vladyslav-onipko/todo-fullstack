import { expressjwt } from 'express-jwt';

interface IJwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      auth?: IJwtPayload;
    }
  }
}

export const authMiddleware = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  credentialsRequired: false,
});
