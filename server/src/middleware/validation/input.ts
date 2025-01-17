import { body } from 'express-validator';

export const checkUserSignupInputs = () => {
  const name = body('name', 'Name must not be empty and contain at least 3 characters')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3 });

  const email = body('email', 'Email entered incorrectly').trim().not().isEmpty().normalizeEmail().isEmail();

  const password = body('password', 'Password must not be empty and contain at least 6 characters')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 6 });

  return [name, email, password];
};

export const checkUserSiginInputs = () => {
  const email = body('email', 'Email entered incorrectly').trim().not().isEmpty().normalizeEmail().isEmail();

  const password = body('password', 'Password must not be empty and contain at least 6 characters')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 6 });

  return [email, password];
};

export const checkCreateTodoListInputs = () => {
  const name = body('name', 'Name must not be empty and contain at least 3 characters')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3 });

  return [name];
};
