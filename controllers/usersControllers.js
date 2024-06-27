import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { controllerWrapper } from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import createAuthResponse from '../helpers/createAuthResponse.js';
import authService from '../services/usersService.js';

const SECRET = process.env.secret;

const registerUser = async (req, res) => {
  if (await authService.findUser({ email: req.body.email }))
    next(HttpError(409, 'Email in use'));

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(req.body.password, SALT);

  const bodyWithHashedPassword = { ...req.body, password: hashedPassword };

  const registeredUser = await authService.register(bodyWithHashedPassword);
  res.status(201).json(createAuthResponse(registeredUser));
};

const loginUser = async (req, res) => {
  const userToLogin = await authService.findUser({ email: req.body.email });
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    userToLogin?.password
  );

  if (!userToLogin || !isPasswordCorrect)
    next(HttpError(401, 'Email or password is wrong'));

  const response = createAuthResponse(userToLogin);

  const token = jwt.sign(response, SECRET, { expiresIn: '24h' });

  await authService.login(userToLogin.email, token);

  res.status(200).json({ ...response, token });
};

const logoutUser = async (req, res) => {
  const user = req.user;
  await authService.logout(user.id);

  res.status(204).json();
};

const getCurrentUser = async (req, res) => {
  res.status(200).json(createAuthResponse(req.user));
};

const updateSubscription = async (req, res) => {
  const user = req.user;
  const updatedUser = await authService.updateSubscription(
    user.id,
    req.body.subscription
  );

  res.status(200).json(createAuthResponse(updatedUser));
};

export default {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  logoutUser: controllerWrapper(logoutUser),
  getCurrentUser: controllerWrapper(getCurrentUser),
  updateSubscription: controllerWrapper(updateSubscription),
};
