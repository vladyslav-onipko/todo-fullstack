import { type NextFunction, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import HttpError from '../../models/error/http-error';
import User from '../../database/schemas/user/user-schema';
import { validateInputs } from '../../utils/validation';
import { HttpErrorMessage } from '../../utils/constants';
import { convertHoursToMilliseconds } from '../../utils/helpers';

const userSigninController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  validateInputs(errors, next);

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new HttpError(HttpErrorMessage.CredentialsSignin, 401);
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      throw new HttpError(HttpErrorMessage.CredentialsSignin, 401);
    }

    const token = jwt.sign({ sub: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    const response = {
      message: 'You have successfully signed in',
      token,
      tokenExpiration: convertHoursToMilliseconds(process.env.JWT_EXPIRATION!),
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
    };
    res.status(200).json(response);
  } catch (err: any) {
    const error = new HttpError(err.message || HttpErrorMessage.Server, err.code || 500);

    return next(error);
  }
};

export default userSigninController;
