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

router.get('/list', (req, res) => {
  res.send('ok');
})

router.post('/list', async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  await db.collection('list').find({
    title,
    content
  })
  res.json({
    title,
    content
  });
});

module.exports = router;
