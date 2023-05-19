const User = require('../models/user.model');
const ApiError = require('../errors/api.error');
const status = require('../enums/status.enum');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');

module.exports = {
    login: async (login, password) => {
        const user = await User.findOne({ login });
        if (!user) throw new ApiError('Bad login or password!', status.authError);
        const equalPassword = await bcrypt.compare(password, user.password);
        if (!equalPassword) throw new ApiError('Bad login or password', status.authError);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: user.login }
    },
    register: async (login, password) => {
        const isRegistered = await User.findOne({ login });
        if (isRegistered) throw new ApiError('User is already registered', status.badRequest);
        const hashedPassword = await bcrypt.hash(password, 5);
        return await User.create({ login, password: hashedPassword });
    },
    logout: async (refreshToken) => {
        return await tokenService.removeToken(refreshToken);
    },
    refresh: async (refreshToken) => {
        if (!refreshToken) throw new ApiError('Authorization error', 401);
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new ApiError('Unauthorized', 401);
        }
        const { payload } = userData;
        const tokens = tokenService.generateTokens(payload);
        await tokenService.saveToken(payload.id, tokens.refreshToken);
        return { ...tokens, user: userData.payload.login };
    }
}