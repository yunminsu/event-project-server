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
    const list = await db.collection('comment').find({ detailId: new ObjectId(req.query.detailId) }).toArray();
    res.json(
      list
    )
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/comment', async (req, res, next) => {
  try {
    const { userId, content, userName, _id, today } = req.body;
    await db.collection('comment').insertOne({
      detailId: new ObjectId(_id),
      authorId: new ObjectId(userId),
      date: today,
      content,
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

router.post('/comment/delete', async (req, res) => {
  try {
    await db.collection('comment').deleteOne({ 
      _id: new ObjectId(req.body.id),
      authorId: new ObjectId(req.body.userId)
    });
    res.send('삭제 성공')
  } catch (err) {
    console.error(err);
  }
});

router.get('/deleteAllcomment', async (req, res) => {
  await db.collection('comment').deleteMany({});
});

router.post('/reserv/delete', async (req, res) => {
  try {
    const result = await db.collection('reserv').deleteOne({ _id: new ObjectId(req.body.cancelId)});
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;