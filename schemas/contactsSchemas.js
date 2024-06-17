import Joi from 'joi';
import JoiStringFactory from 'joi-phone-number';
const extendedJoi = Joi.extend(JoiStringFactory);

export const createContactSchema = extendedJoi.object({
  name: extendedJoi.string().min(1).required(),
  email: extendedJoi.string().email().required(),
  phone: extendedJoi.string().phoneNumber().required(),
});

export const updateContactSchema = Joi.object({
  name: extendedJoi.string().min(1),
  email: extendedJoi.string().email(),
  phone: extendedJoi.string().phoneNumber(),
});
