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
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/festivals'

// DB
mongoose.connect(mongoURI, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// CONTROLLERS
const festivalController = require('./controllers/bestivals.js');
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const commentsController =
require('./controllers/comments.js');


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
app.use('/festivals', festivalController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/comments', commentsController);

//testing
app.get("/test", (req, res) => {
  res.send(req.session);
});

// LISTEN
app.listen(PORT, () => console.log('Bestivals API running on port: ', PORT));
