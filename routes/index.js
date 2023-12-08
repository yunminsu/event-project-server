const express = require('express');
const { client } = require('../database/index');
const db = client.db('base');

const router = express.Router();

router.get('/', (req, res) => {
  // res.send('백엔드연동');
  res.json({
    flag: false,
    message: '이클립스'  
  });
    
});


module.exports = router;