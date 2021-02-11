import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import socketio from 'socket.io';
import { Server } from 'socket.io';
const io: Server = socketio(server);
import cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config();
console.log(require('dotenv').config());
app.use(express.json());

/* SocketIO */
const initListeners = require('./listeners');
initListeners(io);

/* Routes */
import movies from './routes/movies';
app.use('/movies', movies);

const PORT = 4500;

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
