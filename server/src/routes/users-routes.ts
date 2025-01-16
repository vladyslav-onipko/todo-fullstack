import { Router } from 'express';

import userSignupController from '../controllers/user/user-signup';
import userSigninController from '../controllers/user/user-signin';
import { checkUserSignupInputs, checkUserSiginInputs } from '../middleware/validation/input';
// import { authMiddleware } from '../middleware/auth/auth';

const router = Router();

// User signup router
router.post('/signup', checkUserSignupInputs(), userSignupController);

// User signin router
router.get('/signin', checkUserSiginInputs(), userSigninController);

export default router;
