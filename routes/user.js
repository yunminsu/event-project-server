const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/register', async (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // const exisUser = await
  } catch (err) {
    
  }
});

module.exports = router;