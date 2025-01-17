import { type Request, type Response, type NextFunction } from 'express';
import { Types } from 'mongoose';

import { HttpErrorMessage } from '../../utils/constants';
import HttpError from '../../models/error/http-error';
import User from '../../database/schemas/user/user-schema';
import TodoList from '../../database/schemas/todo/todo-list';

const getTodoListsController = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new HttpError(HttpErrorMessage.Server, 404);
    }

    if (user.id !== req.auth?.sub) {
      throw new HttpError(HttpErrorMessage.Unauthorized, 401);
    }

    const todoLists = await TodoList.aggregate([
      { $match: { creator: new Types.ObjectId(userId) } },
      { $lookup: { from: 'users', localField: 'creator', foreignField: '_id', as: 'creator' } },
      { $unwind: '$creator' },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          createdAt: 1,
          todosCount: { $size: '$todos' },
          viewers: 1,
          creator: '$creator.name',
        },
      },
    ]);

    res.status(200).json({ todoLists });
  } catch (err: any) {
    const error = new HttpError(err.message || HttpErrorMessage.Server, err.code || 500);

    return next(error);
  }
};

export default getTodoListsController;
