import { Router } from 'express';

import userSignupController from '../controllers/user/user-signup';
import userSigninController from '../controllers/user/user-signin';
import { checkUserSignupInputs, checkUserSiginInputs } from '../middleware/validation/input';

const router = Router();

// User signup router
router.post('/signup', checkUserSignupInputs(), userSignupController);

// User signin router
router.post('/signin', checkUserSiginInputs(), userSigninController);

export default router;
