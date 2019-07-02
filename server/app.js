const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
// const dbpassword = process.env.dbpassword;

mongoose.connect('mongodb://test:test12@ds245927.mlab.com:45927/heroku_kbkk9tb3', { useNewUrlParser: true });
mongoose.Promise = Promise;

app.use(morgan('dev'));
const app = express();


app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});


module.exports = app;