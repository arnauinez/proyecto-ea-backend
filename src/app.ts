import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
require('dotenv').config();
import * as swaggerDoc from './swagger.json';
const app: express.Application = express();
const PORT = 3800;


// Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const raceRoute = require('./routes/races');
// const authRoute = require('./routes/auth');
app.use('/races', raceRoute);
// app.use('/auth', authRoute);


app.get('/', (req, res) => {
    res.send('Home');
});

// Connect to DB
mongoose.connect( 
    'mongodb+srv://dbuser:dbpass@cluster0-8hrhz.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Connected to DB!')}
);

app.listen(PORT, () => {
    console.log('Server is running');
});