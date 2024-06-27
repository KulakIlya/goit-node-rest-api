import Joi from 'joi';

export const registerUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

export const loginUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const updateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
