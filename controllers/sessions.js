const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');
const Bestival= require('../models/bestivals.js');


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
    const bestival = await Bestival.find({ user: user._id });

    console.log('What is user now anywayz? ', user);
    if (user.authenticate(req.body.password)) {
      req.session.user = user;
      res.status(200).json({ user, bestivals }); // passwords match (successful authenticate)
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

module.exports = router;
