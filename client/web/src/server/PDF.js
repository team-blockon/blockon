const puppeteer = require("puppeteer");

/**
 * PDF를 찍어내기 위한 HTML 생성
 * @param json 템플릿에 바인딩할 데이터
 */
const save = async json => {
  // 브라우저 인스턴스 만들고 탭 하나 띄움
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // request 인터셉트
  await page.setRequestInterception(true);

  // 인터셉트된 request 핸들러
  page.on("request", interceptedRequest => {
    const data = {
      method: "POST",
      postData: JSON.stringify(json),
      headers: {
        "Content-type": "application/json"
      }
    };

    // 이제 요청을 보내보자.
    interceptedRequest.continue(data);
  });

  await page.goto("http://localhost:3000/fillPDF", {
    waitUntil: "networkidle2"
  });
  await page.pdf({ path: "contract.pdf", format: "A4" });

  await browser.close();
};

module.exports = {
  save
};
