import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import socketio, { Server } from 'socket.io';
import movies from './routes/movies';

/* App / Middleware */
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
/* Routes */
app.use('/movies', movies);

/* SocketIO */
const server = http.createServer(app);
const io: Server = socketio(server);
require('./listeners')(io);

/* Deployment */
// const path = require('path');
// const clientPath = path.join(__dirname, '../../client/build/index.html');
// app.use(express.static(clientPath));
// app.get('*', (req, res) => {
//     res.sendFile(clientPath);
// });

const PORT = 4500;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
