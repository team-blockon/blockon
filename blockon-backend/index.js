const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const sockjs = require('sockjs');
const chat = require('./lib/chat');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 8000;

// JSON 바디 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// request log
app.use(morgan('dev'));

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static('./routes/util'));
app.use('/api', require('./routes/api'));

/**
 * NODE_ENV에 따라 리액트 정적 파일 제공
 */
const BUILD_PATH = '../blockon-frontend/build';
const PUBLIC_PATH = '../blockon-frontend/public';

switch (process.env.NODE_ENV) {
case 'production':
  app.use('/', express.static(path.resolve(__dirname, BUILD_PATH)));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, `${BUILD_PATH}/index.html`));
  });
  break;

default:
  app.use('/', express.static(path.resolve(__dirname, PUBLIC_PATH)));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, `${PUBLIC_PATH}/index.html`));
  });
  break;
}

// 1. Chat sockjs server
const sockjs_chat = sockjs.createServer();

sockjs_chat.on('connection', conn => {
  conn.on('data', async strMsg => {
    const msg = JSON.parse(strMsg);
    console.log('message:', msg);

    switch (msg.type) {
    case 'CREATE_CONVERSATION':
      chat.createConversation(conn, msg);
      break;
    case 'SEND_MESSAGE':
      chat.sendMessage(conn.id, msg);
      break;
    }
  });

  conn.on('close', () => {
    // delete clients[conn.id];ㄴ
  });
});

// 2. Express server
const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

sockjs_chat.installHandlers(server, { prefix: '/chat' });

/**
 * Mongoose 설정
 */
mongoose.set('useCreateIndex', true);

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
