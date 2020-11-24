const contactsRouter = require('express').Router()
const { createContact, getContact, updateContact, deleteContact } = require('./contacts')

contactsRouter.post('/createContact', createContact);
contactsRouter.get('/getContact', getContact);
contactsRouter.put('/updateContact', updateContact);
contactsRouter.delete('/deleteContact', deleteContact);

module.exports = contactsRouter;