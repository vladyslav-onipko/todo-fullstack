import { type NextFunction } from 'express';
import { type Result, type ValidationError } from 'express-validator';

import HttpError from '../models/error/http-error';
import { HttpErrorMessage } from './constants';

export const validateInputs = (errors: Result<ValidationError>, next: NextFunction) => {
  if (!errors.isEmpty()) {
    const error = new HttpError(HttpErrorMessage.UserInputs, 422);

    return next(error);
  }
};
