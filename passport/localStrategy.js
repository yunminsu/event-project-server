const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { client } = require('../database');
const db = client.db('base');

module.exports = () => {
  // 첫번재 인자값: 전략 옵션을 설정 가능
  // 아이디/비번 외에 다른 것도 제출받아서 검증하고 싶을 때 => passReqToCallback 옵션
  // 두번째 인자값: 실제 전략(=로그인 시 어떻게 처리할지 동작)을 수행하는 함수
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
  }, async (username, password, done) => {
    try {
      const existUser = await db.collection('user').findOne({ username });
      // 아이디 검사
      if (!existUser) {
        return done(null, false, { message: '가입되지 않은 회원입니다' });
      }
      // 비번 검사
      const result = await bcrypt.compare(password, existUser.password);
      // if (!result) { 
      //   return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      // }
      // 아이디 비번 일치 시
      return done(null, existUser);
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};