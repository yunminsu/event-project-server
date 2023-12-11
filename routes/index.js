const express = require('express');

const { client } = require('../database');
const db = client.db('base'); // board 데이터베이스에 연결

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    // JS Object 형태로 저장
    await db.collection('test').insertOne({ 
      search: req.body.value
    });
    res.send('데이터 저장 완료');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;