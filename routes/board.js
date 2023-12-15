const express = require('express');
const app = express();


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

  console.log(result);

  res.send(result);
  // db.collection('board').deleteMany({})
})

router.get('/listpage', async (req, res) => {
  db.collection('board').updateOne({  })
  const result = await db.collection('board').findOne({  }).toArray();

  console.log(result);

  res.send(result);
});

router.post(`/listpage/`, async (req, res) => {
  // const { postId } = req.params;
  console.log(req.params);
  // console.log(postId);
  const result = db.collection('board').findOne({ _id: new ObjectId(postId) });
  console.log(result);
  res.json({
    flag: true,
    data: result,
  });
});


module.exports = router;
