const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const { isLoggedIn } = require('../middlewares');
const { client } = require('../database/index');
const db = client.db('base');

const router = express.Router();

router.post('/comment', async (req, res, next) => {
  try {
    // const { postId, content } = req.body;
    console.log(req.body);
    res.send('댓글');
    // await db.collection('comment').insertOne({
    //   content,
    //   authorId: req.user._id,
    //   author: req.user.username,
    //   postId: new ObjectId(postId)
    // });

    // res.redirect(`/post/detail/${postId}`);

  } catch (err) {
    console.error(err);
    res.json({
      message: '댓글 등록 실패'
    })
  }
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