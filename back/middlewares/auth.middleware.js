const tokenService = require('../services/token.service');
const ApiError = require('../errors/api.error');
const status = require('../enums/status.enum');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userData = await tokenService.validateAccessToken(token);
        if (!token || !userData) next(new ApiError('Unauthorized', status.AUTH_ERROR));
        next();
    } catch (e) {
        next(new ApiError('Unauthorized', status.AUTH_ERROR));
    }
}