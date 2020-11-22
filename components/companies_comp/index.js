const companiesRouter = require('express').Router()
const { createCompany, getCompany, updateCompany, deleteCompany } = require('./company')

companiesRouter.post('/createCompany', createCompany);
companiesRouter.get('/getCompany', getCompany);
companiesRouter.put('/updateCompany', updateCompany);
companiesRouter.delete('/deleteCompany', deleteCompany);

module.exports = companiesRouter;