const brandRouter = require('express').Router();

const brandController = require('../controllers/brand.controller');

brandRouter.post('/', brandController.createBrand);
brandRouter.get('/', brandController.getAll);
brandRouter.get('/:category', brandController.getByCategory);
brandRouter.delete('/:_id', brandController.deleteById);

module.exports = brandRouter;