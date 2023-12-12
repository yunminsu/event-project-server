const express = require('express');
const app = express();


const { client } = require('../database');
const db = client.db('base');

const router = express.Router();


app.get('/board', (req, res) => {
  res.send('ok');
})

app.post('/board', async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  await db.collection('board').insertOne({
    title,
    content,
  })
});

module.exports = router;
