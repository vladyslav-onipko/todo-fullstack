import { type Request, type Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { validateInputs } from '../../utils/validation';
import HttpError from '../../models/error/http-error';
import { HttpErrorMessage } from '../../utils/constants';
import User from '../../database/schemas/user/user-schema';
import TodoList from '../../database/schemas/todo/todo-list';

const createTodoListController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, userId } = req.body;
  const errors = validationResult(req);

  validateInputs(errors, next);

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new HttpError(HttpErrorMessage.Server, 404);
    }

    if (user.id !== req.auth?.sub) {
      throw new HttpError(HttpErrorMessage.Unauthorized, 401);
    }

    const todoList = new TodoList({ name, creator: user.id });

    const session = await TodoList.startSession();
    session.startTransaction();
    await todoList.save({ session });
    user.todoLists.push(todoList.id);
    await user.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: 'Todo list created successfully', todoList });
  } catch (err: any) {
    const error = new HttpError(err.message || HttpErrorMessage.Server, err.code || 500);

    return next(error);
  }
};

export default createTodoListController;
