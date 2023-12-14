const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');

dotenv.config();

// 라우터 넣을 곳
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

// DB 연결 함수 가져오기
const { connect } = require('./database/index');

// ./passport/index.js 가져오기
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
connect();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: false,
    secure: false,  // 개발단계에선 false. 기본이 false
    // 만료기한 설정(expires, maxage) 안 하면 기본이 session
  },
  // store: MongoStore.create({
  //   mongoUrl: `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.hqitiuj.mongodb.net/`,
  //   dbName: 'base',
  // })
}));

app.use(passport.initialize());
app.use(passport.session());

// res.locals.user에 req.user 정보 넣어놓음
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 미들웨어 라우터 넣을 곳
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);

app.use((req, res, next) => {
  const error = new Error( `${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 서버에서 대기 중');
});