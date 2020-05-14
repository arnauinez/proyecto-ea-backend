import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
require('dotenv').config();
import * as swaggerDocument from './swagger.json';
import * as http from 'http';

const app: express.Application = express();
// Import Routes
const raceRoute = require('./routes/races');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const oauthRoute = require('./routes/oauth');
const socket = require('./services/socket');

const PORT = 3700;
const SOCKETPORT = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/races', raceRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);

app.use('/oauth', oauthRoute);

app.get('/', (req, res) => {
    res.send('Home');
});

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect to DB
mongoose.connect( 
    String(process.env.DB_CONNECTION),
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { 
        console.log('Connected to DB!');
        console.log(String(process.env.DB_CONNECTION));
    }
);

app.listen(PORT, () => {
    console.log('Server is running', PORT);
});

const server = http.createServer(app);
let socketIO = require('socket.io');
const io = socketIO.listen(server);
server.listen(SOCKETPORT, () => {
  console.log(`Socket running on ${SOCKETPORT}`);
});
socket.socket(io);

// io.on('connection', (socket: SocketIO.Socket) => {
//     console.log('APP User connected!');
// });

// io.on("connection", function(socket: any) {
//   console.log("");
//   // whenever we receive a 'message' we log it out
//   socket.on("message", function(message: any) {
//     console.log(message);
//   });
// });
