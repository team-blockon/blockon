const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 8000;

// 리액트 서버 사이드 렌더링
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// JSON 바디 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// request log
app.use(morgan('dev'));

app.use('/contracts', express.static(__dirname + '/uploads/contracts'));

/* build */
// app.use("/", express.static(path.resolve(__dirname, "../../build")));

/* development */
app.use('/', express.static(path.resolve(__dirname, '../../public')));

app.use(express.static('./routes/util'));
app.use('/api', require('./routes/api'));

/**
 * req.body 값으로 JSX 템플릿을 채운다.
 */
app.post('/fillPDF', (req, res) => {
  res.render('ContractTemplate', req.body);
});

/**
 * 클라이언트 사이드 렌더링
 * 리액트 라우터가 렌더링하도록 index 띄운다.
 */
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

// 몽고 DB 서버 연결
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});
