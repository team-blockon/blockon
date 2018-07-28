const puppeteer = require("puppeteer");
const url = require("url");
const path = require("path");
const IPFS = require("ipfs-daemon");
const fs = require("fs");

/*
    POST /api/pdf
*/

exports.pdf = (req, res) => {
  console.log("/api/pdf", req.body);

  /**
   * PDF를 찍어내기 위한 HTML 생성
   * @param json 템플릿에 바인딩할 데이터
   */
  const savePdfToLocal = async () => {
    // 브라우저 인스턴스 만들고 탭 하나 띄움
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // request 인터셉트
    await page.setRequestInterception(true);

    // 인터셉트된 request 핸들러
    page.on("request", interceptedRequest => {
      const data = {
        method: "POST",
        postData: JSON.stringify(req.body),
        headers: {
          "Content-type": "application/json"
        }
      };

      // 이제 요청을 보내보자.
      interceptedRequest.continue(data);
    });

    await page.goto(
      url.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: "/api/pdf/fill"
      }),
      {
        waitUntil: "networkidle2"
      }
    );
    await page.pdf({
      path: path.join(__dirname, "contract.pdf"),
      format: "A4"
    });

    await browser.close();
  };

  /**
   * 생성된 PDF 파일을 IPFS에 저장
   */
  const savePdfToIpfs = () => {
    const ipfs = new IPFS();

    // readFileSync에 인코딩을 지정하지 않으면 Buffer가 리턴된다.
    const buffer = fs.readFileSync(path.join(__dirname, "contract.pdf"));

    // IPFS 데몬을 시작하고 준비된 경우, 호출되는 콜백 함수
    ipfs.on("ready", () => {
      console.log("IPFS daemon is ready!");
      /*
      * 피어 ID: 퍼블릭 키의 해시
      * 
      * 피어는 서로 연결되면, 퍼블릭 키를 교환한다.
      * 피어 ID가 퍼블릭 키의 해시와 일치하는지 검증하여 올바른 피어와 통신한다.
      * 다른 피어의 ID로 변조하더라도 프라이빗 키가 없으면 디코드할 수 없다.
      */
      console.log("ipfs.PeerId:", ipfs.PeerId);
      // 게이트웨이 주소: IPFS를 통해 파일을 보는데 사용
      console.log("ipfs.GatewayAddress:", ipfs.GatewayAddress);
      // API 주소: 클라이언트 요청에 응답하는 HTTP 서버
      console.log("ipfs.APIAddress:", ipfs.APIAddress);

      ipfs.files.add(buffer, (err, files) => {
        const hash = files[0].hash;
        console.log("IPFS hash:", hash);
      });
    });

    // IPFS에 에러가 발생한 경우, 호출되는 콜백 함수
    ipfs.on("error", e => console.log(e));

    // IPFS 데몬 중지
    // ipfs.stop();
  };

  // 1. 로컬에 PDF 저장
  savePdfToLocal().then(() => {
    // 2.IPFS에 PDF 저장
    savePdfToIpfs();

    // 3. 로컬에 저장된 PDF 응답
    var file = fs.createReadStream(path.join(__dirname, "contract.pdf"));
    var stat = fs.statSync(path.join(__dirname, "contract.pdf"));
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    file.pipe(res);
  });
};

/**
 * req.body 값으로 JSX 템플릿을 채운다.
 */
exports.fill = (req, res) => {
  res.render("ContractTemplate", req.body);
};
