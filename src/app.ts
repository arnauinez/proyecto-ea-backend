import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
require('dotenv').config();
import * as swaggerDoc from './swagger.json';
const app: express.Application = express();
const PORT = 3600;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Middlewares
// app.use(cors());
// app.use(bodyParser.json());

//Import Routes
// const raceRoute = require('./routes/races');
// const authRoute = require('./routes/auth');
// app.use('/races', raceRoute);

app.get('/', (req, res) => {
    res.send('Home');
});

// Connect to DB
mongoose.connect( 
    String(process.env.DB_CONNECTION),
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Connected to DB!')}
);

app.listen(PORT, () => {
    console.log('Server is running');
});

// () => {
//     return new Promise((resolve, reject) => {
//         app.listen(
//             PORT,
//             () => {
//                 resolve(PORT);
//                 console.log('Server is running');
//             }
//             // .on('error', (err: object) => reject(err))
//         )
//     })
// }