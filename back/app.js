require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const socketIO = require('socket.io');
const { createServer } = require('http');
const mongoose = require('mongoose');

const { FRONTEND_URL, PORT, MONGO_URL } = require('./config/config');
const apiRouter = require('./routes/api.router');

const app = express();

const server = createServer(app);
const io = socketIO(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    })
})
app.set('io', io);
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: FRONTEND_URL
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(apiRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

server.listen(PORT, () => {
    mongoose.set('strictQuery', true).connect(MONGO_URL).then(() => console.log('db connected')).catch((e) => console.log(e));
});