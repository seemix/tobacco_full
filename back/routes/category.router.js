const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const fileUploadMiddleware = require('../middlewares/file-upload.middleware');

categoryRouter.post('/', authMiddleware, fileUploadMiddleware('category'), categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.delete('/:id', authMiddleware, categoryController.deleteById);
categoryRouter.patch('/image/:fileName', authMiddleware, categoryController.deleteImage);
categoryRouter.patch('/', authMiddleware, categoryController.updateOrder);
categoryRouter.get('/:filename', categoryController.getImage);
categoryRouter.put('/', authMiddleware, fileUploadMiddleware('category'), categoryController.updateCategory);

module.exports = categoryRouter;