import express from 'express';

import contactsController from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteFieldSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:id', contactsController.getOneContact);

contactsRouter.delete('/:id', contactsController.deleteContact);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  contactsController.createContact
);

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  contactsController.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  validateBody(updateFavoriteFieldSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
