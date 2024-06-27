import express from 'express';

import contactsController from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteFieldSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactsController.getAllContacts);

contactsRouter.get('/:id', authenticate, contactsController.getOneContact);

contactsRouter.delete('/:id', authenticate, contactsController.deleteContact);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  authenticate,
  contactsController.createContact
);

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  authenticate,
  contactsController.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  validateBody(updateFavoriteFieldSchema),
  authenticate,
  contactsController.updateStatusContact
);

export default contactsRouter;
