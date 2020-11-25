const contactsRouter = require('express').Router()
const { createContact, getContactById, getContacts, updateContact, deleteContact, contactIdParams, contactExists, } = require('./contacts')

contactsRouter.post('/', createContact);
contactsRouter.get('/:id', contactIdParams, getContactById);
contactsRouter.get('/', getContacts);
contactsRouter.put('/:id', contactIdParams, contactExists, updateContact);
contactsRouter.delete('/:id', contactIdParams, contactExists, deleteContact);

module.exports = contactsRouter;