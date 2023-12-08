const express = require('express');

const { client } = require('../database');
const db = client.db('base');

const router = express.Router();

module.exports = router;
