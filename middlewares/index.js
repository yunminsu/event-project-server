const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
    next();
  } else {
    // res.status(401).send('로그인 필요');
    const message = encodeURIComponent('로그인 필요');
    res.redirect(`/error=${message}`);
  }
 };

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

const inputCheck = (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    res.json({
      flag: false,
      message: '아이디를 입력하세요'
    });
  } else if (!password) {
    res.json({
      flag: false,
      message: '비밀번호를 입력하세요'
    })
  } else {
    next();
  }
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  inputCheck
};