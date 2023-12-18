const express = require('express');
const { client } = require('../database');
const { ObjectId } = require('mongodb');
const db = client.db('base');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ok');
})

router.post('/', async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;
  const view = req.body.view;
  const writer = req.body.writer;
  await db.collection('board').insertOne({
    title,
    content,
    date,
    view,
    writer
  })
  res.json({
    flag: true,
    message: '등록 성공'
  });
});

router.get('/list', async (req, res) => {
  const result = await db.collection('board').find({}).toArray();
  res.send(result);
  // db.collection('board').deleteMany({})
})

router.get('/listpage', async (req, res) => {
  db.collection('board').updateOne({  })
  const result = await db.collection('board').findOne({  }).toArray();
  res.send(result);
});

router.post(`/listpage`, async (req, res) => {
  const { postId } = req.body;
  console.log(postId);
  const result = await db.collection('board').findOne({ _id: new ObjectId(postId) });
  console.log(result);
  res.json({
    flag: true,
    data: result,
  });
});


module.exports = router;
