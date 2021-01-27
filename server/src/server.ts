import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import socketio from 'socket.io';
const io = socketio(server);
import cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
const initListeners = require('./listeners');

/* SocketIO */
initListeners(io);

/* Routes */
import movies from './routes/movies';
app.use('/movies', movies);

const PORT = 4500;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
