const express = require('express');
const { client } = require('../database/index');
const db = client.db('base');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('연동');
  // res.json({

  // });
});