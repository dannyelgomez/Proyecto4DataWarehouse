const companiesRouter = require('express').Router()
const { createCompany, getCompanies, updateCompany, deleteCompany, companyIdParams, getCompanyById, companyExists } = require('./company')

companiesRouter.post('/', createCompany);
companiesRouter.get('/:id', companyIdParams, getCompanyById);
companiesRouter.get('/', getCompanies);
companiesRouter.put('/:id', companyIdParams, companyExists, updateCompany);
companiesRouter.delete('/:id', companyIdParams, companyExists, deleteCompany);

module.exports = companiesRouter;