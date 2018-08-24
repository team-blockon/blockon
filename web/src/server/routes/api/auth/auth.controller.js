const jwt = require('jsonwebtoken');
const Account = require('../../../models/account');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const DIR_PATH = path.resolve(__dirname, '../../../uploads');

/*
    POST /api/auth/profile
    form-data {
      profile
    }
*/

/**
 * 프로필 사진 업로드
 * @param {*} req
 * @param {*} res
 */
exports.profile = (req, res) => {
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
  }).single('profile'); // req.file은 thumbnail 필드의 파일 정보

  // 이미지인지 확장자와 MIME 타입 체크
  const checkImage = profile => {
    const mimeType = profile.mimetype.split('/');
    const fileType = mimeType[1];

    return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
  };

  const profileUpload = new Promise((resolve, reject) => {
    if(fs.existsSync(DIR_PATH) === false){
      fs.mkdirSync(DIR_PATH);
    }
    upload(req, res, err => {
      if (err) reject(err);
      if (!!req.file === false) reject(new Error('file type error'));
      resolve(req.file.filename);
    });
  });

  profileUpload
    .then(path => {
      res.json({ path });
    })
    .catch(err => {
      res.status(403).json({
        message: err
      });
    });
};

/*
    POST /api/auth/register
    {
      ethAddress,
      profileFilename,
      username,
      email
    }
*/

exports.register = (req, res) => {
  const { ethAddress, profileFilename, username, email } = req.body;

  let newAccount = null;

  // 유저가 존재하지 않으면 새 유저 생성
  const create = account => {
    if (account) {
      throw new Error('username exists');
    } else {
      Account.create(ethAddress, profileFilename, username, email);
    }
  };

  // 유저 수 카운트
  const count = account => {
    newAccount = account;
    return Account.countDocuments({}).exec();
  };

  // 유저 수가 1이면 admin 부여
  const assign = count => {
    if (count === 1) {
      return newAccount.assignAdmin();
    } else {
      // if not, return a promise that returns false;
      return Promise.resolve(false);
    }
  };

  // 클라이언트에게 응답
  const respond = isAdmin => {
    res.json({
      message: 'registered successfully',
      admin: !!isAdmin
    });
  };

  // 에러가 있을 때 실행되는 함수 (이미 존재하는 email)
  const onError = error => {
    res.status(409).json({
      message: error.message
    });
  };

  // ethAddress 중복 체크
  Account.findByEthAddress(ethAddress)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};

/*
    POST /api/auth/login
    {
      email,
      password
    }
*/

exports.login = (req, res) => {
  const { ethAddress } = req.body;
  const secret = process.env.SECRET_KEY;

  // 유저의 정보를 확인하고, token 발급
  const check = account => {
    const { profile, isJunggae } = account;
    const loggedInfo = {
      profile,
      isJunggae
    };

    if (!account) {
      // 유저가 존재하지 않음
      throw new Error('login failed');
    } else {
      // 유저가 존재하면, JWT를 비동기적으로 생성하는 Promise 객체 생성
      const p = new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id: account._id,
            admin: account.admin,
            ethAddress
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'blockon.house',
            subject: 'userInfo'
          },
          (err, token) => {
            if (err) reject(err);
            resolve({ token, loggedInfo });
          }
        );
      });
      return p;
    }
  };

  // token 응답
  const respond = ({ token, loggedInfo }) => {
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 유효기간 7일
      httpOnly: true
    });
    res.json(loggedInfo);
  };

  // 에러 발생
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  // 유저 찾기
  Account.findByEthAddress(ethAddress)
    .then(check)
    .then(respond)
    .catch(onError);
};

/*
    POST /api/auth/logout
*/

exports.logout = (req, res) => {
  res.clearCookie('access-token');
  res.status(204).end(); // 데이터 없이 응답
};
