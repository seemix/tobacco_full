const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');
const fileUploadMiddleware = require('../middlewares/file-upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

productRouter.post('/', authMiddleware, fileUploadMiddleware('products'), productController.createProduct);
productRouter.get('/', productController.getProductsByCategory);
productRouter.get('/:id', productController.getProductById);
productRouter.get('/new/get', productController.getNewProducts);
productRouter.get('/image/:filename', productController.getImage);
productRouter.patch('/image/:filename', authMiddleware, productController.deleteImage);
productRouter.put('/', authMiddleware, fileUploadMiddleware('products'), productController.updateProduct);
productRouter.delete('/', authMiddleware, productController.deleteProduct);

module.exports = productRouter;