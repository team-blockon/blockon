const jwt = require('jsonwebtoken');
const Account = require('../../../models/account');
const multer = require('multer');

/*
    POST /api/auth/register
    {
      email,
      password
    }
*/

exports.register = (req, res) => {
  const { ethAddress, username, email } = req.body;

  const upload = multer({
      storage: multer.diskStorage({
          destination : function (req, file, cb) {
              cb(null, 'upload/');
          },
          filename: function (req, file, cb) {
              cb(null, new Date().valueOf() + file.originalname);
          }
      }),
      fileFilter : function (req, file, cb) {
          return checkImage(file) ? cb(null, true) : cb(new Error('thumbnail type error'));
      }
  }).single('thumbnail');

  const checkImage = (thumbnail) => {
        const type = thumbnail.originalname.split('.')[1];
        const mimeType = thumbnail.mimetype.split('/')[0];

        return ((type === ( 'jpg'|| 'jpeg' || 'png')) && mimeType === 'image');
  };

  const thumbnailUpload = () => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if(err) reject(new Error("thumbnail type error"));
            else resolve(req.file.path);
        });
    });
  };

  let newAccount = null;

  // 유저가 존재하지 않으면 새 유저 생성
  const create = thumbnail => {
    // ethAddress 중복 체크
    return Account.findByEthAddress(ethAddress)
        .then( (account) => {
            return new Promise( (resolve, reject) => {
                if (account) {
                    throw new Error('username exists');
                } else {
                    resolve(Account.create(ethAddress ,thumbnail , username, email));
                }
            });
        });
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

    thumbnailUpload()
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
