const sliderRouter = require('express').Router();
const sliderController = require('../controllers/slider.controller');
const fileUploadMiddleware = require('../middlewares/file-upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

sliderRouter.post('/', authMiddleware, fileUploadMiddleware('slider'), sliderController.createSlide);
sliderRouter.get('/', sliderController.getAllSlides);
sliderRouter.patch('/', authMiddleware, sliderController.updateOrder);
sliderRouter.delete('/:_id', authMiddleware, sliderController.deleteSlide);
sliderRouter.put('/', authMiddleware, fileUploadMiddleware('slider'), sliderController.updateSlide);

module.exports = sliderRouter;