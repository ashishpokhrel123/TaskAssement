const express = require('express');
const mongoose = require('mongoose');
const todo = require('./routes/todo');
const user = require('./routes/user');
const dotenv = require("dotenv");
const auth = require('./auth/auth');

dotenv.config();

var app = express();
var port = process.env.PORT || 3000;


// Connecting to Mongo Atlas Cloud Db

mongoose.connect(process.env.DB || 'mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});


app.use(express.json());
app.use('/user', user);
app.use('/task', auth.verifyUser,  todo)


//Listening to Port
app.listen(port, () => {
    console.log(`App is running at local host: ${port}`)
})
