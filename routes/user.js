const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');


const { client } = require('../database');
const db = client.db('base');

const router = express.Router();

router.get('/register', (req, res) => {
  res.send('dd');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existUser = await db.collection('user').findOne({ username });
    if (existUser) {
      throw new Error('존재하는 사용자');
    }

    const hash = await bcrypt.hash(password, 12);
    await db.collection('user').insertOne({
      username,
      password : hash,
      email
    });
    res.json({
      flag: true,
      message: '회원 가입 성공'
    });
  } catch (err) {
    console.error(err);
    res.json({
      flag: false,
      message: err.message
    });
  }
});

module.exports = router;