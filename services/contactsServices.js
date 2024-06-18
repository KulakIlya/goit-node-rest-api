import Contact from './models/contact.js';

export function getAllContacts() {
  return Contact.find({});
}

export function getOneContact(contactId) {
  return Contact.findById(contactId);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete({ _id: contactId });
}

export function createContact(body) {
  return Contact.create(body);
}

export function updateContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

export function updateStatusContact(id, body) {
  return Contact.findByIdAndUpdate(id, { favorite: body }, { new: true });
}
