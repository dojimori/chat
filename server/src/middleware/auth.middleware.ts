import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError('Unauthorized', 401);
  }

  const decodedToken = jwt.verify(accessToken, 'secret');
  (req as any).userId = (decodedToken as any).userId;
}