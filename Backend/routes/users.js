var express = require('express');
var router = express.Router();

require('../models/connection')
const User = require('../models/users')
const { checkBody } = require("../modules/checkBody")
const uid2 = require("uid2")
const bcrypt = require("bcrypt");
const { Hash } = require('crypto');


//Checkbody for the signup & setup of the signup endpoint
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ['username', 'password', 'firstname'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        hash: hash,
        token: uid2(32),
        likedTweets: [],
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

//Checkbody for the signin & setup of the signin endpoint
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    console.log(data)
    if (data && bcrypt.compareSync(req.body.password, data.hash)) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});


router.post('/myLikedTweets', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      res.json({
        result: true,
        liked: user.likedTweets
      })
    })
})

module.exports = router;

