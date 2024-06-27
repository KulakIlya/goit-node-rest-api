import { controllerWrapper } from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import * as contactsService from '../services/contactsServices.js';

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts({
    ...req.query,
    owner: req.user.id,
  });
  res.status(200).json(contacts);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contactsService.getOneContact({
    _id: id,
    owner: req.user.id,
  });

  if (!contact) next(HttpError(404, 'Resource not found'));
  res.status(200).json(contact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  const deletedContact = await contactsService.deleteContact({
    _id: id,
    owner: req.user.id,
  });
  if (!deletedContact) next(HttpError(404, 'Resource not found'));
  res.status(200).json(deletedContact);
};

const createContact = async (req, res) => {
  const createdContact = await contactsService.createContact({
    ...req.body,
    owner: req.user.id,
  });
  res.status(201).json(createdContact);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const updatedContact = await contactsService.updateContact(
    { _id: id, owner: req.user.id },
    req.body
  );
  if (!updatedContact) next(HttpError(404, 'Resource not found'));
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;

  const updatedContact = await contactsService.updateStatusContact(
    { _id: id, owner: req.user.id },
    req.body.favorite
  );
  if (!updatedContact) next(HttpError(404, 'Resource not found'));
  res.status(200).json(updatedContact);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
