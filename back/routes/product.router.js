const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');
const fileUploadMiddleware = require('../middlewares/file-upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

productRouter.post('/',  fileUploadMiddleware('products'), productController.createProduct);
productRouter.get('/', productController.getProductsByCategory);
productRouter.get('/:id', productController.getProductById);
productRouter.get('/new/get', productController.getNewProducts);
productRouter.get('/image/:filename', productController.getImage);
productRouter.patch('/image/:filename', authMiddleware, productController.deleteImage);
productRouter.put('/', productController.updateProduct);
productRouter.delete('/', authMiddleware, productController.deleteProduct);
productRouter.post('/image', fileUploadMiddleware('products'), productController.addImage);
productRouter.patch('/image', fileUploadMiddleware('products'), productController.replaceImage);
productRouter.delete('/image', productController.deleteImage);

module.exports = productRouter;