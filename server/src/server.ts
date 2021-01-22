import fs from 'fs';
import express from 'express';
import socketio from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);
const io = socketio(server);
import cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config();

/* Routes */
import movies from './routes/movies';
app.use('/movies', movies);

const PORT = 4500;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
