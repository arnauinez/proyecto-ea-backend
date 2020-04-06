import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
require('dotenv').config();
import * as swaggerDocument from './swagger.json';
const app: express.Application = express();
//Import Routes
const raceRoute = require('./routes/races');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const profileRoute = require('./routes/profile');


const PORT = 3700;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/races', raceRoute);
app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/profile', profileRoute);


app.get('/', (req, res) => {
    res.send('Home');
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect to DB
mongoose.connect( 
    //'mongodb+srv://runnea.tk:27017/test0',
    //'mongodb+srv://dbuser:dbpass@cluster0-8hrhz.mongodb.net/test?retryWrites=true&w=majority',
    String(process.env.DB_CONNECTION),
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Connected to DB!')}
);

app.listen(PORT, () => {
    console.log('Server is running');
});