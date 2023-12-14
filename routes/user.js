const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { client } = require('../database/index');
const { isNotLoggedIn, isLoggedIn, inputCheck } = require('../middlewares');
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
// 로그인 로그아웃 라우터
router.get('/login', isNotLoggedIn, (req, res) => {
  if (req.user) {
    res.json({
      flag: true,
    });
  } else {
    res.json({
      flag: false
    })
  }
});

// POST /user/login
router.post('/login', inputCheck, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return res.status(500).json(authError);
    }
    if (!user) return res.status(401).json(info.message);

    req.login(user, (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      res.json({
        flag: true,
        message: 'login success',
        user: req.user,
      });
    });
  })(req, res, next);
});

router.post('/loginCheck', async (req, res, next) => {
  const { id } = req.body;
  const result = await db.collection('sessions').findOne({ _id: id });
  console.log(result);
  if (result) {
    res.json({
      user: req.user,
    })
  }
});


// GET /user/logout
router.post('/logout', (req, res, next) => {
  req.logout((logoutError) => {
    if (logoutError) return next(logoutError);
    res.clearCookie('connect.sid');
    res.redirect('/');  
  });
});

router.get('/deleteAll', async (req, res) => {
  await db.collection('sessions').deleteMany({});
});


router.post('/reserv', async (req, res) => {
  const { reservItem: { fstvlNm, fstvlStartDate, fstvlEndDate }, count, payTotal, payBtn, userName, userId } = req.body
  try {
    await db.collection('reserv').insertOne({
      fstvlNm,
      fstvlDate: `${fstvlStartDate} ~ ${fstvlEndDate}`,
      count,
      payTotal,
      payType: payBtn,
      user: new ObjectId(userId),
      userName
    })
  } catch (err) {
    console.error(err);
  }
});

router.get('/reserv/info', async (req, res) => {
  console.log(req.query);
  try {
    const result = await db.collection('reserv').find({ user: new ObjectId(req.query.userId) }).toArray();
    res.send(
      result
    )
  } catch (err) {
    console.error(err);
  }
});

router.post('/profile', (req, res, next) => {
  if (req.user) {
    res.json({
      user: req.user,
    });
  }
});


module.exports = router;