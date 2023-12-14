const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const { isLoggedIn } = require('../middlewares');
const { client } = require('../database/index');
const db = client.db('base');

const router = express.Router();

router.get('/', (req,res) => {
  res.render('main');
});

router.post('/comment', async (req, res, next) => {
  try {
    const { userId, content } = req.body;
    // console.log(req.user);
    await db.collection('comment').insertOne({
      content,
      authorId: req.user._id,
      author: req.user.username,
      postId: new ObjectId(userId)
    });
    res.json({
      message: '댓글 등록 성공'
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: '댓글 등록 실패'
    })
    // next(err);
  }
});

module.exports = router;