import { type Request, type Response, type NextFunction } from 'express';

import HttpError from '../../models/error/http-error';
import { HttpErrorMessage } from '../../utils/constants';

export const httpErrorMiddleware = (error: HttpError, _: Request, res: Response, next: NextFunction) => {
  // checking if response has already been sent
  if (res.headersSent) {
    return next(error);
  }

  const response = {
    message: error.message,
    status: error.code,
  };

  res.status(error.code).json(response);
};

/**
 * Throw an error with the status 404 if router was not found.
 */
export const notFoundErrorMiddleware = () => {
  throw new HttpError(HttpErrorMessage.NotFound, 404);
};
