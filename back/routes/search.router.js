const searchRouter = require('express').Router();

const searchController = require('../controllers/search.controller');

searchRouter.get('/', searchController.search);

module.exports = searchRouter;