// DEPENDENCIES
const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const app        = express();
const session    = require('express-session');
require('pretty-error').start();
const bcrypt      =require('bcrypt');

// CONFIG
const PORT       = process.env.PORT || 3004;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/Festivals'

// DB
mongoose.connect(mongoURI, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// CONTROLLERS
const festivalsController = require('./controllers/festivals');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const commentsController =
require('./controllers/comments');


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: 'Yeah',
  resave: true,
  saveUninitialized: false,
  maxAge: 2592000000
}));
app.use('/festivals', festivalsController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/comments', commentsController);

// LISTEN
app.listen(PORT, () => console.log('Bestivals API running on port: ', PORT));
