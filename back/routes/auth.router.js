const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/login', authController.login);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/check', authController.checkAuth);
authRouter.post('/logout', authController.logout);
authRouter.post('/register', authController.register);

module.exports = authRouter;