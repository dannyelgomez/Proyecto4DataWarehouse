const companiesRouter = require('express').Router()
const { createCompany } = require('./company')

companiesRouter.post('/createCompany', createCompany);
/* companiesRouter.get('/', readCompany);
companiesRouter.put('/', updateCompany);
companiesRouter.delete('/', deleteCompany); */

module.exports = companiesRouter;