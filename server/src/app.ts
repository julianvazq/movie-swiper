const fs = require('fs');
/* Initialize socket.io and express */
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const cors = require('cors');
app.use(cors());

require('dotenv').config();

/* Routes */
const router = require('./routes/movies');
app.use(router);

const PORT = 4500;
server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
