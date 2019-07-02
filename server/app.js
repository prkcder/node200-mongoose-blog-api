const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const morgan = require('morgan');

mongoose.connect('mongodb://localhost/my-blog', { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});


module.exports = app;