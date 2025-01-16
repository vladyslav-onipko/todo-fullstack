import { type NextFunction, type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../database/schemas/user/user-schema';
import HttpError from '../../models/error/http-error';
import { validateInputs } from '../../utils/validation';
import { HttpErrorMessage } from '../../utils/constants';
import { convertHoursToMilliseconds } from '../../utils/helpers';

const userSignupController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  validateInputs(errors, next);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new HttpError(HttpErrorMessage.UserExists, 422);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ sub: savedUser.id, email: savedUser.email }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    const response = {
      message: 'You have successfully signed up',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
      token,
      tokenExpiration: convertHoursToMilliseconds(process.env.JWT_EXPIRATION!),
    };
    res.status(201).json(response);
  } catch (err: any) {
    const error = new HttpError(err.message || HttpErrorMessage.Server, err.code || 500);

    return next(error);
  }
};

export default userSignupController;
