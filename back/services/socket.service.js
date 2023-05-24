const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const { FRONTEND_URL } = require('../config/config');

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});
module.exports = { app, server, io };