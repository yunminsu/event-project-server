const express = require('express');

const { client } = require('../database');
const db = client.db('base');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
})

module.exports = router;
