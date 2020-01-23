const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

//database
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });


let todoRoutes = require('./routes/todo');
let userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

//generates log for any request made
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use('/api/todo', todoRoutes);
app.use('/api/user', userRoutes);

//error handling 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

app.listen(port, () => {
    console.log("App is running on port " + port);
});