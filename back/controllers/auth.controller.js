const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const status = require('../enums/status.enum');
const ApiError = require('../errors/api.error');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { login, password } = req.body;
            const userData = await userService.register(login, password);
            res.status(status.created).json({ login: userData.login, id: userData.id });
        } catch (e) {
            next(new ApiError('Error while registering user', status.serverError));
        }
    },
    login: async (req, res, next) => {
        const { login, password } = req.body;
        try {
            const userData = await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 3600000,
                httpOnly: true,
                sameSite: true
            })
                .status(status.ok)
                .json(userData);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const token = userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(status.ok).json(token);
        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: true
            });
            return res.json(userData);
        } catch (e) {
            next(new ApiError('Error refresh', 500));
        }
    },
    checkAuth: async (req, res, next) => {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            if (!accessToken) res.status(status.authError);
            const userData = tokenService.validateAccessToken(accessToken);
            res.status(status.ok).json(userData);
        } catch (e) {
            next(e);
        }

    }
}
