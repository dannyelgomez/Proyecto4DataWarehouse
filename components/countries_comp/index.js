const countriesRouter = require('express').Router()

const { createCountry, getCountryById, getCountries, updateCountry, deleteCountry, countryIdParams, countryExists } = require('./countries');

countriesRouter.post('/', createCountry);
countriesRouter.get('/:id', countryIdParams, getCountryById);
countriesRouter.get('/', getCountries);
countriesRouter.put('/:id', countryIdParams, countryExists, updateCountry);
countriesRouter.delete('/:id', countryIdParams, countryExists, deleteCountry);

module.exports = countriesRouter;