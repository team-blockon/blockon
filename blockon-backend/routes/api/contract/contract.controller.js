const Account = require('../../../models/account');
const Contract = require('../../../models/contract');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const DIR_PATH = path.resolve(__dirname, '../../../uploads/contracts');

/**
 * 거래 등록시 유효한 이메일인지 확인한다.
 * @param req
 * @param res
 */
exports.isRightEmail = (req, res) => {
  const { email } = req.body;

  const isRightEmail = email => {
    return new Promise((resolve, reject) => {
      Account.findByEmail(email).then(account => {
        if (!account) {
          reject(new Error('error'));
        }
        resolve(account.address);
      });
    });
  };

  const respond = address => {
    res.json({
      result: true,
      message: address
    });
  };

  // 에러가 있을 때 실행되는 함수 (이미 존재하는 email)
  const onError = error => {
    res.status(409).json({
      result: false,
      message: error.message
    });
  };

  isRightEmail(email)
    .then(respond)
    .catch(onError);
};

/**
 * 매물사진 업로드
 * @param {*} req
 * @param {*} res
 */
exports.photo = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      // 저장될 경로와 파일명 지정
      destination: function(req, file, cb) {
        cb(null, DIR_PATH);
      },
      filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname); // 타임스탬프 + 원래 파일명
      }
    }),
    fileFilter: function(req, file, cb) {
      if (checkImage(file)) {
        cb(null, true); // 파일 허용
      } else {
        cb(null, false); // 파일 거부
      }
    }
  }).single('thumbnail'); // req.file은 thumbnail 필드의 파일 정보

  // 이미지인지 확장자와 MIME 타입 체크
  const checkImage = profile => {
    const mimeType = profile.mimetype.split('/');
    const fileType = mimeType[1];

    return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
  };

  const photoUpload = new Promise((resolve, reject) => {
    if (fs.existsSync(DIR_PATH) === false) {
      fs.mkdirSync(DIR_PATH);
    }
    upload(req, res, err => {
      if (err) reject(err);
      if (!!req.file === false) reject(new Error('file type error'));
      resolve(req.file.filename);
    });
  });

  photoUpload
    .then(path => {
      console.log(path);
      res.json({ path });
    })
    .catch(err => {
      res.status(403).json({
        message: err
      });
    });
};

/*
    POST /api/contract
    {
        people: {
            agentAddress,
            sellerAddress,
            buyerAddress
        },
        building: {
            type,
            name,
            address,
            photo
        },
        contract: {
            index,
            date,
            type
        }
    }
*/

/**
 * Blockon 컨트랙트에서 계약 생성 후 오프체인 정보 저장을 위한 함수
 * @param {*} req
 * @param {*} res
 */
exports.addContract = (req, res) => {
  Contract.create(req.body).then(contract => {
    res.json(contract);
  });
};

/*
    POST /api/contract/:index
    {
      accountAddress
    }
*/

/**
 * index와 accountAddress가 일치하는 contract 응답
 * @param {*} req
 * @param {*} res
 */
exports.getContractByIndex = (req, res) => {
  const index = req.params.index;
  const { accountAddress } = req.body;

  console.log('index:', index);
  console.log('accountAddress:', accountAddress);

  Contract.findOne({
    $or: [
      { 'people.agentAddress': accountAddress },
      { 'people.sellerAddress': accountAddress },
      { 'people.buyerAddress': accountAddress }
    ],
    'contract.index': index
  }).then(contract => {
    console.log('contract', contract);
    res.json(contract);
  });
};
