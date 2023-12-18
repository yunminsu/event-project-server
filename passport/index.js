const passport = require('passport');
const local = require('./localStrategy');
const { ObjectId } = require('mongodb');
const { client } = require('../database/index');
// DB 이름!
const db = client.db('base'); 

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.collection('user').findOne({ _id: new ObjectId(id) });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  local();
};