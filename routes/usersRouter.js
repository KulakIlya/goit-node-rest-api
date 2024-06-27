import express from 'express';

import usersController from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  loginUser,
  registerUser,
  updateSubscription,
} from '../schemas/usersSchemas.js';

const usersRouter = express.Router();

usersRouter.get('/current', authenticate, usersController.getCurrentUser);
usersRouter.post(
  '/register',
  validateBody(registerUser),
  usersController.registerUser
);
usersRouter.post('/login', validateBody(loginUser), usersController.loginUser);
usersRouter.delete('/logout', authenticate, usersController.logoutUser);
usersRouter.patch(
  '/',
  validateBody(updateSubscription),
  authenticate,
  usersController.updateSubscription
);

export default usersRouter;
