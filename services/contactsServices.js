import Contact from './models/contact.js';

export const getAllContacts = ({ limit = 3, page = 1, favorite, owner }) => {
  const skipCount = (page - 1) * limit;
  const query = favorite ? { favorite, owner } : { owner };
  return Contact.find(query).skip(skipCount).limit(limit);
};

export const getOneContact = (filter) => Contact.findOne(filter);

export const deleteContact = (filter) => Contact.findByIdAndDelete(filter);

export const createContact = (body) => Contact.create(body);

export const updateContact = (filter, body) =>
  Contact.findOneAndUpdate(filter, body, { new: true });

export const updateStatusContact = (filter, body) =>
  Contact.findOneAndUpdate(filter, { favorite: body }, { new: true });
