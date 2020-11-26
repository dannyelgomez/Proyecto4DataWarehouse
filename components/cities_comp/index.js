const citiesRouter = require('express').Router()

const { createCity, getCityById, getCities, updateCity, deleteCity, cityIdParams, cityExists } = require('./cities');

citiesRouter.post('/', createCity);
citiesRouter.get('/:id', cityIdParams, getCityById);
citiesRouter.get('/', getCities);
citiesRouter.put('/:id', cityIdParams, cityExists, updateCity);
citiesRouter.delete('/:id', cityIdParams, cityExists, deleteCity);

module.exports = citiesRouter;