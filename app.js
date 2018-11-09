const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

const MongoStore = require('connect-mongo')(session);

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//settings database
require('./db');

//Initiate app
const app = express();

//sessions
app.use(
    session({
        secret: 'passport-tutorial',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        })
    })
);

//Configure app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

if(!isProduction) {
    app.use(errorHandler());
}

//Models
require('./Models');


//passport config
require('./config/passport');


//Routes
app.use(require('./routes'));


//Error handlers & middlewares
if(!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });

    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });

});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
