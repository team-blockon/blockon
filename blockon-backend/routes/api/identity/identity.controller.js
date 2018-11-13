const ipfsAPI = require('ipfs-api');
const multer = require('multer');
const fs = require('fs');
const Identity = require('../../../models/identity');
const FileTypeCheck = require('../../../lib/utils/FileTypeCheck');

const Caver = require('caver-js');
const caver = new Caver('ws://52.79.41.43:8552');

const blockonAbi = require('../../../abi/blockon_abi');
const accountAbi = require('../../../abi/account_abi');
const Account = require('../../../models/account');
// const request = require('request');
// const vision = require('@google-cloud/vision');

const PORT = '5001';
const HOST = 'ipfs.infura.io';
const ipfs = ipfsAPI({ host: HOST, port: PORT, protocol: 'https' });

//허용할 이미지타입
const imageType = ['jpg', 'png', 'jpeg'];
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: async (req, file, cb) => {
    cb(null, FileTypeCheck.uploadFileType(file.mimetype, imageType));
    // cb(null, true);
  }
}).single('identity'); // req.file은 identity 필드의 파일 정보
/**
 * 공인중개사 자격증을 업로드한다.
 * @param req body.ethAddress 중개인 이더리움 주소, file : identity 필드의 자격증 파일
 * @param res
 * @returns {Promise<void>}
 */
exports.uploadIdentity = async (req, res) => {
  const { accountAddress } = req.body;
  // const ethAddress = 'abcdefaad1daaaa'; //테스트용
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: async (req, file, cb) => {
      // cb(null, FileTypeCheck.uploadFileType(file.mimetype, imageType));
      cb(null, true);
    }
  }).single('identity'); // req.file은 identity 필드의 파일 정보

  /**
   * ipfs에 저장하고 db에 해쉬값을 저장한다.
   * @param file
   * @returns {Promise<ethAddress>}
   */
  const saveToIPFS = async file => {
    console.log(file);
    const files = [
      {
        path: 'identity/' + file.originalname, //파일 이름을 유지하기위해 디렉토리 유지
        content: file.buffer
      }
    ];
    const addedFile = await ipfs.add(files);
    console.log(addedFile);
    return Identity.create(accountAddress, addedFile[1].hash);
  };

  //하나의 계정에는 하나의 증명서만 저장
  if (!!(await Identity.findOne({ accountAddress }))) {
    res.json({
      result: false,
      info: 'existed address'
    });
  } else {
    await upload(req, res, async err => {
      if (err) {
        res.json({
          result: false,
          info: err
        });
      } else {
        const info = await saveToIPFS(req.file);
        res.json({
          result: true,
          info: info
        });
      }
    });
  }
};

/**
 * google vision api를 사용하여 공인중개사 자격증번호와 이름 추출
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.check = async (req, res) => {
  // const upload = multer({
  //   storage: multer.memoryStorage(),
  //   fileFilter: async (req, file, cb) => {
  //     // cb(null, FileTypeCheck.uploadFileType(file.mimetype, imageType));
  //     cb(null, true);
  //   }
  // }).single('identity');
  //
  // const client = new vision.ImageAnnotatorClient();
  //
  // await upload(req, res, async err => {
  //   client
  //     .textDetection(req.file.buffer)
  //     .then(results => {
  //       let text = results[0].fullTextAnnotation.text;
  //       text = text.replace(/\s/g, '');
  //       const numberIndex = text.indexOf('자격증번호:');
  //       const agentNumber = text.slice(numberIndex + 6, numberIndex + 19);
  //       const nameIndex = text.indexOf('성명');
  //       const agentName = text.slice(nameIndex + 3, nameIndex + 6);
  //       const birthIndex = text.indexOf('생년월일');
  //       const birth = text
  //         .slice(birthIndex + 5, birthIndex + 14)
  //         .replace('년', '-')
  //         .replace('월', '-');
  //
  //       //취득일 추출
  //       let acquireDateIndex = text.indexOf('증명합니다.');
  //       let acquireDate = text.slice(acquireDateIndex + 6);
  //       acquireDateIndex = acquireDate.indexOf('년');
  //       acquireDate = acquireDate
  //         .slice(acquireDateIndex - 4, acquireDateIndex + 5)
  //         .replace('년', '-')
  //         .replace('월', '-')
  //         .replace('일', '');
  //
  //       res.json({
  //         agentNumber,
  //         agentName,
  //         birth,
  //         acquireDate
  //       });
  //     })
  //     .catch(err => {
  //       console.error('ERROR:', err);
  //     });
  // });
};

/**
 * 공인중개사 인증시 자격번호 확인
 * @param req
 * @param res
 */
// exports.isRightIdentity = async (req, res) => {
//   const { agentName, name, agentNumber } = req.query;
//
//   const url =
//     'http://apis.data.go.kr/1611000/nsdi/EstateBrkpgService/attr/getEBBrokerInfo'; /*URL*/
//   let queryParams =
//     '?' +
//     'ServiceKey=gJBPzjIAuMVVKB%2Bk5uYkqBP6yFZAvD0kYsIzKpBhI5FgEPwWDPhPXBO07%2BzvCmkdQtxOhUV3H8Ge%2FB0Aasxf7g%3D%3D' /*Service Key*/ +
//     // + '&bsnmCmpnm=' + encodeURIComponent(agentName) /*사업자상호*/
//     '&brkrNm=' +
//     encodeURIComponent(name) /*중개업자명*/ +
//     '&format=json' /*응답결과 형식(xml 또는 json)*/ +
//     '&numOfRows=100' /*검색건수*/ +
//     '&pageNo=1'; /*페이지번호*/
//
//   request(url + queryParams, 'GET', (err, result, body) => {
//     console.log(JSON.parse(body).EBBrokers);
//     const info = JSON.parse(body).EBBrokers.field[0];
//     if (!!info) {
//       res.json({
//         result: agentNumber === info.crqfcNo
//       });
//     } else {
//       res.json({
//         result: false
//       });
//     }
//   });
const isRightIdentity = (agentNumber, agentName, birth, acquireDate) => {
  // const {agentName, name, agentNumber} = req.query;
  //
  // const url = 'http://apis.data.go.kr/1611000/nsdi/EstateBrkpgService/attr/getEBBrokerInfo'; /*URL*/
  // let queryParams = '?' + 'ServiceKey=gJBPzjIAuMVVKB%2Bk5uYkqBP6yFZAvD0kYsIzKpBhI5FgEPwWDPhPXBO07%2BzvCmkdQtxOhUV3H8Ge%2FB0Aasxf7g%3D%3D' /*Service Key*/
  // + '&bsnmCmpnm=' + encodeURIComponent(agentName) /*사업자상호*/
  // + '&brkrNm=' + encodeURIComponent(name) /*중개업자명*/
  // + '&format=json' /*응답결과 형식(xml 또는 json)*/
  // + '&numOfRows=100' /*검색건수*/
  // + '&pageNo=1'; /*페이지번호*/
  //
  // request(url + queryParams, "GET", (err, result, body) => {
  //     console.log(JSON.parse(body).EBBrokers);
  //     const info = JSON.parse(body).EBBrokers.field[0];
  //     if(!!info) {
  //         res.json({
  //             result: agentNumber === info.crqfcNo
  //         });
  //     }else{
  //         res.json({
  //             result : false
  //         });
  //     }
  // });
  return true;
};

exports.setAgent = async (req, res) => {
  const { agentNumber, agentName, birth, acquireDate, email } = req.body;

  if (isRightIdentity(agentNumber, agentName, birth, acquireDate)) {
    const account = await Account.findOne({ email });
    const accountAddress = account.accountAddress;

    if (!!account) {
      const blockonContract = new caver.klay.Contract(
        blockonAbi,
        '0xee326f1044718e6a613ce949f644277524c429d1'
      );
      const accountContract = new caver.klay.Contract(
        accountAbi,
        accountAddress
      );

      blockonContract.methods
        .athorizeAsAgent(accountAddress)
        .send({
          from: '0xfe9e54d6c5f13156b82c29a4157a22e91cc20fbb',
          gas: 200000
        })
        .on('confirmation', async (confirmationNumber, receipt) => {
          console.log(receipt);
          await Account.update({ email }, { isAgent: true });
        })
        .on('error', console.error);

      const isAgent = await accountContract.methods.isAgent().call();
      console.log('isAgent:', isAgent);
    }
  }
  res.json({
    result: true
  });
};

/**
 * db에 저장되어있는 ipfs해쉬값을 불러오기 위한 함수
 * @param ethAddress
 * @returns {Promise<*>}
 */
const getIdentity = async accountAddress => {
  const identity = await Identity.findOne({ accountAddress });
  try {
    return await ipfs.get(identity.idHash);
  } catch (e) {
    return e;
  }
};

/**
 * 공인중개사 자격증 다운로드
 * TODO 확인용 기능만 만들어둔 상태
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.downloadIdentity = async (req, res) => {
  const { accountAddress } = req.params;
  const download = await getIdentity(accountAddress);

  const filename = download[1].path.split('/')[1];
  fs.writeFileSync(filename, download[1].content);
  res.json({
    result: true,
    info: download[0].path
  });
};

/**
 * ipfs에 저장된 증명서 확인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.referenceIdentity = async (req, res) => {
  const { accountAddress } = req.params;

  const file = await getIdentity(accountAddress);
  const path = file[1].path;
  const image = await ipfs.cat(path);
  res.send(image);
};
