import { nanoid } from 'nanoid';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const contactsPath = path.resolve('db', 'contacts.json');
const contacts = JSON.parse(await readFile(contactsPath));

const updateContacts = async () =>
  await writeFile(contactsPath, JSON.stringify(contacts, null, 1));

export async function getAllContacts() {
  return contacts;
}

export async function getOneContact(contactId) {
  const contact = contacts.find((item) => contactId === item.id);

  return contact ?? null;
}

export async function deleteContact(contactId) {
  const contactIndex = contacts.findIndex((item) => contactId === item.id);

  if (contactIndex === -1) return null;

  const [deletedContact] = contacts.splice(contactIndex, 1);
  await updateContacts();

  return deletedContact;
}

export async function createContact(body) {
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await updateContacts();

  return newContact;
}

export async function updateContact(id, body) {
  const indexToUpdate = contacts.findIndex((item) => item.id === id);

  if (indexToUpdate === -1) return null;

  contacts[indexToUpdate] = { ...contacts[indexToUpdate], ...body };

  updateContacts();

  return contacts[indexToUpdate];
}
