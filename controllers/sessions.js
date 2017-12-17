const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');
const Festival= require('../models/bestivals.js');


// //login get route
// router.get('/login', async (req, res) => {
//   const festivals = await Bestival.find();
//   res.render('posts/login.ejs', {
//   message: req.session.message,
//   username: req.session.username
//   });
// });

//Login POST Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // a document
    const festival = await Bestival.find({ user: user._id });

    console.log('What is user now anywayz? ', user);
    if (user.authenticate(req.body.password)) {
      req.session.user = user;
      res.status(200).json({ user, festivals }); // passwords match (successful authenticate)
    } else {
      res.status(403).json({ err: 'Forbidden' }); // password is wrong
    }
  } catch (err) { // user doesn't exist, can't run authenticate without a user!
    res.status(400).json({ err: err.message });
  }
});

router.delete('/logout', (req, res) => {
  console.log('session to destroy: ', req.session);
  req.session.destroy(() => {
    console.log('session has been destroyed ... ', req.session); // undefined, {}
    res.status(200).json({ message: 'Session destroyed'});
  });
});

//PASSWORD HANDLING
//where user will enter personal info to register
router.post('/register', async (req, res, next) => {
  //get password from what user entered -- never store in db w/o encryption
const password = req.body.password;
//encrypt it
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//grab Username
const username = req.body.username;
//put user info into db
const userDbEntry = {};
//set username to be username
userDbEntry.username = username;
//set password as ENCRYPTED password
userDbEntry.password = passwordHash;
//What does await do???
// await User.create(userDbEntry);
console.log(userDbEntry);

try {
  const user = await User.create(userDbEntry);
  console.log(user);
  req.session.username = user.username;
  req.session.logged = true;
  res.redirect('/');
} catch(err) {
console.log(err);
}
});

//logOUT get route
router.get('/logout', (req, res) => {
  // here we destroy the session
  req.session.destroy();
  res.redirect('/user/login');
});

router.get('/update', (req, res) => {
  req.session.anyProperty = "SOMETHING";
  console.log(req.session);
});

// export the controller
module.exports = router;
