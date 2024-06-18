import Joi from 'joi';
import JoiStringFactory from 'joi-phone-number';

const extendedJoi = Joi.extend(JoiStringFactory);

export const createContactSchema = extendedJoi.object({
  name: extendedJoi.string().min(1).required(),
  email: extendedJoi.string().email().required(),
  phone: extendedJoi.string().phoneNumber().required(),
  favorite: extendedJoi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
  name: extendedJoi.string().min(1),
  email: extendedJoi.string().email(),
  phone: extendedJoi.string().phoneNumber(),
  favorite: extendedJoi.boolean().default(false),
});

export const updateFavoriteFieldSchema = Joi.object({
  favorite: extendedJoi.boolean().required(),
});
