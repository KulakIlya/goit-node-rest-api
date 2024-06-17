import { controllerWrapper } from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import * as contactsService from '../services/contactsServices.js';

const getAllContacts = async (_, res) => {
  const contacts = await contactsService.getAllContacts();
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.getOneContact(id);
  if (!contact) throw HttpError(404, 'Resource not found');
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const deletedContact = await contactsService.deleteContact(id);
  if (!deletedContact) throw HttpError(404, 'Resource not found');
  res.status(200).json(deletedContact);
};

const createContact = async (req, res) => {
  const createdContact = await contactsService.createContact(req.body);
  res.status(201).json(createdContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const updatedContact = await contactsService.updateContact(id, req.body);
  if (!updatedContact) throw HttpError(404, 'Resource not found');
  res.status(200).json(updatedContact);
};

export default {
  getAllContacts,
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact,
  updateContact: controllerWrapper(updateContact),
};
