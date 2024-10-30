const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

server.use(cors());

server.use(express.json());

server.use('/api/routes', routes);

mongoose.connect('mongodb+srv://dev:passwordneu@neucrh.ilq4p.mongodb.net/?retryWrites=true&w=majority&appName=neucrh').then(() => {
    console.log('connected');
    server.listen(3000, () => {
        console.log('listening');
    });
}).catch((error) => {
    console.log(error);
});