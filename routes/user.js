const express = require('express');
const passport = require('passport');

const { client } = require('../database');
const db = client.db('base');

const router = express.Router();

// router.get('/register', async (req, res) => {
//   res.render('register');
// });

router.post('/register', async (req, res) => {
  try {
    const { username, password, pw, email } = req.body;
    console.log(username, password, pw, email);
    await db.collection('user').insertOne({
      username,
      password,
      pw,
      email
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;