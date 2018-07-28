const IPFS = require("ipfs-daemon");
const fs = require("fs");
const path = require("path");

/**
 * 생성된 PDF 파일을 IPFS에 저장
 */
const saveFileToIPFS = () => {
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

module.exports = {
  saveFileToIPFS
};
