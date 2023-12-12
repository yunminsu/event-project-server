const express = require('express');
const app = express();


const { client } = require('../database');
const db = client.db('base');

app.get('/', (req, res) => {
  res.send('ok');
})

app.post('/', async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  await db.collection('Board').insertOne({
    title,
    content,
  })
})