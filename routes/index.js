const express = require('express');

const { client } = require('../database')

const router = express.Router();
const db = client.db('base');

router.get('/', (req, res) => {
  // res.render('main');
  if (req.user) {
    res.json({
      flag: true,
      username: req.user.username
    });
  } else {
    res.json({
      flag: false
    })
  }
});

router.post('/', (req, res) => {
  // if (req.user) {
  //   res.json({
  //     flag: true,
  //   });
  // } else {
  //   res.json({
  //     flag: false
  //   })
  // }
});

// 프론트에서 값 전달 받아 데이터베이스에 저장
// router.post('/test', async (req, res) => {
//   try {
//     await db.collection('test').insertOne({ 
//       search: req.body.value 
//     });
//     res.send('데이터 저장 완료');
//   } catch (err) {
//     console.error(err);
//   }
// });

router.get('/list', async (req, res) => {
  try {
    const lists = await db.collection('list').find({}).toArray();
    res.send(lists);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

// try {
//   const res = await axios.post('http://localhost:8088/test', { value })
//   console.log(res.data);
// } catch (err) {
//   console.error(err);
// }
