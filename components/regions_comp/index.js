const regionsRouter = require('express').Router()

const { createRegion, getRegionById, getRegions, updateRegion, deleteRegion, regionIdParams, regionExists } = require('./regions');

regionsRouter.post('/', createRegion);
regionsRouter.get('/:id', regionIdParams, getRegionById);
regionsRouter.get('/', getRegions);
regionsRouter.put('/:id', regionIdParams, regionExists, updateRegion);
regionsRouter.delete('/:id', regionIdParams, regionExists, deleteRegion);

module.exports = regionsRouter;