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
    const { username, password, pw, email } = req.body;
    const existUser = await db.collection('user').findOne({ username });
    if (existUser) {
      throw new Error('존재하는 사용자');
    }

    const hash = await bcrypt.hash(password, 12);
    await db.collection('user').insertOne({
      username,
      password : hash,
      pw: hash,
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

router.post('/reserv', async (req, res) => {
  const { reservItem: { fstvlStartDate, fstvlEndDate }, count, payTotal, payBtn, userName, userId } = req.body
  try {
    await db.collection('reserv').insertOne({
      fstvlNm,
      fstvlDate: `${fstvlStartDate} ~ ${fstvlEndDate}`,
      count,
      payTotal,
      payType: payBtn,
      user: userId,
      userName
    })
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;