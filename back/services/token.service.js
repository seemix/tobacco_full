const jwt = require('jsonwebtoken');

const config = require('../config/config');
const Token = require('../models/token.model');

module.exports = {
    generateTokens: (payload) => {
        const accessToken = jwt.sign({ payload }, config.JWT_ACCESS_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ payload }, config.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    },
    saveToken: async (userId, refreshToken) => {
        const tokenData = await Token.findOne({ where: { userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return Token.create({ userId, refreshToken });
    },
    removeToken: async (refreshToken) => {
        return Token.deleteOne({ refreshToken });
    },
    validateAccessToken: async (accessToken) => {
        try {
            return jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    },
    validateRefreshToken: async (refreshToken) => {
        try {
            return jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    },
    findToken: async (refreshToken) => {
        return Token.findOne({ refreshToken });
    }
}