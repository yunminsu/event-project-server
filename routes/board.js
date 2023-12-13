const express = require('express');
const app = express();


const { client } = require('../database');
const db = client.db('base');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ok');
})

router.post('/', async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  await db.collection('board').insertOne({
    title,
    content,
  })
  res.json({
    flag: true,
    message: '등록 성공'
  });
});

router.get('/list', async (req, res) => {
  // res.send('ok');
  const result = await db.collection('board').find({}).toArray();
  console.log(result);
})

router.post('/list', async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  await db.collection('board').find({}).toArray();
  res.json({
    title,
    content
  });
});

module.exports = router;
