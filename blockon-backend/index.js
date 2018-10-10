const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const sockjs = require("sockjs");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 8000;

// JSON 바디 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// request log
app.use(morgan("dev"));

app.use("/uploads", express.static(__dirname + "/uploads"));

/* build */
// app.use("/", express.static(path.resolve(__dirname, "../../build")));

/* development */
app.use(
  "/",
  express.static(path.resolve(__dirname, "../blockon-frontend/public"))
);

app.use(express.static("./routes/util"));
app.use("/api", require("./routes/api"));

/**
 * 클라이언트 사이드 렌더링
 * 리액트 라우터가 렌더링하도록 index 띄운다.
 */
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

/**
 * 채팅 SockJS 서버 설정
 */
const clients = {}; // 접속된 모든 유저

// 메시지 보낸 유저를 제외한 모든 유저에게 브로드캐스팅
const broadcast = (connId, message) => {
  for (const client in clients) {
    if (client !== connId) {
      clients[client].write(JSON.stringify(message));
    }
  }
};

// 1. Chat sockjs server
const sockjs_chat = sockjs.createServer();

sockjs_chat.on("connection", conn => {
  clients[conn.id] = conn;

  conn.on("data", message => {
    broadcast(conn.id, JSON.parse(message));
  });

  conn.on("close", () => {
    delete clients[conn.id];
  });
});

// 2. Express server
const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

sockjs_chat.installHandlers(server, { prefix: "/chat" });

/**
 * Mongoose 설정
 */
mongoose.set("useCreateIndex", true);

// 몽고 DB 서버 연결
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", console.error);
db.once("open", () => {
  console.log("connected to mongodb server");
});
