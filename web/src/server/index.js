const express = require("express");
const bodyParser = require("body-parser");
const PDF = require("./PDF");
const IPFS = require("./IPFS");
const Mongoose = require("./mongo/Mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 8000;


const sign = require('./sign');

// 리액트 서버 사이드 렌더링
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

// JSON 바디 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* database */
app.use(Mongoose.connection());



/* build */
// app.use("/", express.static(path.resolve(__dirname, "../../build")));

/* development */
app.use("/", express.static(path.resolve(__dirname, "../../public")));
app.use(cors());  // cross-origin 요청 허용


/* sign */
app.use('/sign', sign);


app.post("/api/pdf", (req, res) => {
  console.log("/api/pdf", req.body);
  // 1. 로컬에 PDF 저장
  PDF.save(req.body).then(() => {
    // 2.IPFS에 PDF 저장
    IPFS.saveFileToIPFS();
    // 3. 로컬에 저장된 PDF 응답
    var file = fs.createReadStream(path.join(__dirname, "contract.pdf"));
    var stat = fs.statSync(path.join(__dirname, "contract.pdf"));
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    file.pipe(res);
  });
});

/**
 * req.body 값으로 JSX 템플릿을 채운다.
 */
app.post("/fillPDF", (req, res) => {
  res.render("ContractTemplate", req.body);
});

/**
 * 클라이언트 사이드 렌더링
 * 리액트 라우터가 렌더링하도록 index 띄운다.
 */
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
