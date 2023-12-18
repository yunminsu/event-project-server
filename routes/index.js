const express = require('express');
const { client } = require('../database');
const db = client.db('base');

const router = express.Router();

router.get('/', (req, res) => {
  // console.log('루트',req.user);
  res.render('main');
  
});

router.get('/list', async (req, res) => {
  try {
    const lists = await db.collection('list').find({}).toArray();
    res.send(lists);
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;