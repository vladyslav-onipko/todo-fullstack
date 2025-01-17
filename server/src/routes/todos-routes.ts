import { Router } from 'express';

import { authMiddleware } from '../middleware/auth/auth';
import createTodoListController from '../controllers/todo/create-todolist';
import getTodoListsController from '../controllers/todo/get-todolists';
import { checkCreateTodoListInputs } from '../middleware/validation/input';

const router = Router();

router.get('/todolists/:userId', authMiddleware, getTodoListsController);

router.post('/todolists', authMiddleware, checkCreateTodoListInputs(), createTodoListController);

export default router;
