import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';
import sightingRoutes from './routes/sightings.js';
import authRoutes from './routes/auth.js';
import webhook from './routes/webhook.js';
import apiRoutes from './routes/apiRoutes.js';



import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT

// app.use.urlencoded({ extended: true});
app.use(express.json());


import mongoose from './config/mongoose.js';

mongoose.connectWithDB().catch(err => {
    console.log(err)
    process.exit(0);
})

// routes
app.use('/api', apiRoutes)
app.use('/api/users',  usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sightings', sightingRoutes);
app.use('/api/webhook', webhook);

app.get('/', (req, res) => {
    res.send('Hello and welcome to my awesome API please go to /api to get started');
});

app.listen(PORT, () => console.log('Server running on localhost: ' + PORT));


