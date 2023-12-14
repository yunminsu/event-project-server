const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const { isLoggedIn } = require('../middlewares');
const { client } = require('../database/index');
const db = client.db('base');

const router = express.Router();

router.get('/comment', async (req, res) => {
  try {
    const list = await db.collection('comment').find({}).toArray();
    res.json({
      list
    })
    console.log(list);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/comment', async (req, res, next) => {
  try {
    const { userId, content, userName } = req.body;
    await db.collection('comment').insertOne({
      content,
      authorId: new ObjectId(userId),
      author: userName
    });
    res.json({
      message: '댓글 등록 성공'
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: '댓글 등록 실패'
    })
    next(err);
  }
});

module.exports = router;