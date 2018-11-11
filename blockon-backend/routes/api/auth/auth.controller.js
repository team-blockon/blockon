const jwt = require('jsonwebtoken');
const Account = require('../../../models/account');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EmailAuth = require('../../../models/emailAuth');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const CryptoUtil = require('../../util/CryptoUtil');
const Caver = require('caver-js');

const caver = new Caver('ws://52.79.41.43:8552');
const blockonAbi = require('../../../abi/blockon_abi');

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
  }).single('profile'); // req.file은 profile 필드의 파일 정보

  // 이미지인지 확장자와 MIME 타입 체크
  const checkImage = profile => {
    const mimeType = profile.mimetype.split('/');
    const fileType = mimeType[1];

    return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
  };

  const profileUpload = new Promise((resolve, reject) => {
    if (!fs.existsSync(DIR_PATH)) {
      fs.mkdirSync(DIR_PATH);
    }
    upload(req, res, err => {
      if (err) reject(err);
      if (!req.file) reject(new Error('file type error'));
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
      profileFilename,
      email,
      password,
      username
    }
*/

exports.register = async (req, res) => {
  const { profileFilename, email, password, username } = req.body;
  //아이디 중복체크
  const account = await Account.findOne({ email });
  if (!!account) {
    res.json({
      result: false
    });
  } else {
    //email 인증 상태 확인
    const emailAuth = await EmailAuth.findOne({ email });

    // if (emailAuth.status === 1) {
    //이메일 인증 가입처리
    // await EmailAuth.updateStatus(email, 2);

    const caverAccount = caver.klay.accounts.create(
      '12345678901234567890123456789012'
    );
    const keyStore = caver.klay.accounts.encrypt(
      caverAccount.privateKey,
      password
    );

    const blockonContract = new caver.klay.Contract(
      blockonAbi,
      '0xee326f1044718e6a613ce949f644277524c429d1'
    );

    blockonContract.methods
      .createAccount(caverAccount.address)
      .send({
        from: '0xfe9e54d6c5f13156b82c29a4157a22e91cc20fbb',
        gas: 3000000
      })
      .on('transactionHash', hash => {
        console.log('hash:', hash);
      })
      .on('receipt', receipt => {
        console.log('receipt:', receipt);
      })
      .on('error', error => {
        console.error('error:', error);
      });

    blockonContract.events.CreateAccount(
      { filter: { publicAddress: caverAccount.address }, fromBlock: 0 },
      async (error, event) => {
        console.log('event error:', error);
        console.log('event:', event);

        const accountAddress = event.returnValues.accountAddress;
        const pwdHash = CryptoUtil.hashing(password);
        await Account.create(
          keyStore,
          accountAddress,
          profileFilename,
          username,
          email,
          pwdHash
        );

        res.json({
          result: true
        });
      }
    );
    // } else {
    //   //인증받지 않았거나 가입된 상태일경우
    //   res.json({
    //     result: false
    //   });
    // }
  }
};

/*
    POST /api/auth/login
    {
      email,
      password
    }
*/

exports.login = (req, res) => {
  const { email, password } = req.body;
  const pwdHash = CryptoUtil.hashing(password);
  const secret = process.env.SECRET_KEY;

  // 유저의 정보를 확인하고, token 발급
  const check = account => {
    const { _id, profile, isJunggae, keyStore } = account;
    const loggedInfo = {
      profile,
      isJunggae,
      klaytnAddress: keyStore.address
    };
    if (!account) {
      // 유저가 존재하지 않음
      throw new Error('login failed');
    } else {
      // 유저가 존재하면, JWT를 비동기적으로 생성하는 Promise 객체 생성
      const p = new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id,
            keyStore
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'blockon.house',
            subject: 'userInfo'
          },
          (err, token) => {
            if (err) reject(err);
            resolve({ token, loggedInfo, keyStore });
          }
        );
      });
      return p;
    }
  };

  // token 응답
  const respond = ({ token, loggedInfo, keyStore }) => {
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 유효기간 7일
      httpOnly: true
    });
    res.json({ loggedInfo, keyStore });
  };

  // 에러 발생
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  // 유저 찾기
  Account.findOne({ email, pwdHash })
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

/**
 * 인증 email 전송
 * @param req
 * @param res
 */
exports.sendAuthEmail = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID, // gmail 계정 아이디를 입력
      pass: process.env.EMAIL_PASSWORD // gmail 계정의 비밀번호를 입력
    }
  });

  const token = randomstring.generate(6);
  const uri = `${
    process.env.BLOCKON_URI
  }/api/auth/authEmail/?email=${email}&token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,

    subject: '안녕하세요, BlockOn 입니다. 이메일 인증을 해주세요.',
    html: `<p>BlockOn Email 인증</p><br/>인증번호:${token}`
  };

  const createEmailAuth = async () => {
    const emailAuth = await EmailAuth.findOne({ email });
    if (!!emailAuth) {
      switch (emailAuth.status) {
      case 0:
      case 1:
        await EmailAuth.updateToken(email, token);
        return true;
      case 2:
        //이미 가입된 이메일
        return false;
      default:
      }
    } else {
      await EmailAuth.create(email, token);
      return true;
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    const result = await createEmailAuth();
    res.json({
      result
    });
  } catch (e) {
    res.json({
      result: false,
      info: e
    });
  }
};

/**
 * 이메일 인증 - 인증 이메일에서 인증하기 버튼 클릭시 호출
 * @param req
 * @param res
 */
exports.authEmail = async (req, res) => {
  const { email, token } = req.body;
  const updateEmailStatus = async () => {
    const emailAuth = await EmailAuth.findOne({ email });
    console.log(emailAuth);
    switch (emailAuth.status) {
    case 0:
      if (emailAuth.token === token) {
        await EmailAuth.updateStatus(email, 1);
        return 1;
      } else {
        return 2;
      }
    case 1:
      return 3;
    case 2:
      return 4;
    default:
    }
  };

  // 1:certification 2:invalid token 3: already certificated 4:already signed up
  try {
    const result = await updateEmailStatus();
    let info = null;
    switch (result) {
    case 1:
      info = 'certification';
      break;
    case 2:
      info = 'invalid token';
      break;
    case 3:
      info = 'already certificated';
      break;
    case 4:
      info = 'already signed up';
      break;
    }
    res.json({
      result,
      info
    });
  } catch (err) {
    res.send(`<script>alert('${err}'); close();</script>`);
  }
};
