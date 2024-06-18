import { isValidObjectId } from 'mongoose';

import HttpError from '../helpers/HttpError.js';

const isValidId = (_, req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return next(HttpError(404, `${id} is not valid id`));
  next();
};
