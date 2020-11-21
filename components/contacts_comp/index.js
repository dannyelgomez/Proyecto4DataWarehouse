const contactsRouter = require('express').Router()

const { createContacts, readContacts, updateContacts, deleteContacts } = require('./contacts')

contactsRouter.post('/createConctacts', createContacts);
contactsRouter.get('/readContacts', readContacts);
contactsRouter.put('/updateContacts', updateContacts);
contactsRouter.delete('/deleteContacts', deleteContacts);

module.exports = contactsRouter;