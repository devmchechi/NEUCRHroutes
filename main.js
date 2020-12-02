const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

server.use(cors());

server.use(express.json());

server.use('/api/routes', routes);

mongoose.connect('mongodb+srv://api:apikey@cluster0.6haop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('connected');
    server.listen(4000, () => {
        console.log('listening');
    });
}).catch((error) => {
    console.log(error);
});