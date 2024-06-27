import jwt from 'jsonwebtoken';

import HttpError from '../helpers/HttpError.js';
import authService from '../services/usersService.js';

const SECRET = process.env.secret;

export const authenticate = async (req, _, next) => {
  if (!req.headers.authorization) next(HttpError(401));
  const [bearer, token] = req.headers.authorization.split(' ');
  if (bearer !== 'Bearer') next(HttpError(401));

  try {
    const { user } = jwt.verify(token, SECRET);

    const userToSet = await authService.findUser({ _id: user.id });

    if (!userToSet) next(HttpError(401, 'User not found'));

    req.user = userToSet;
    next();
  } catch (error) {
    console.error(error);
    next(HttpError(401));
  }
};
