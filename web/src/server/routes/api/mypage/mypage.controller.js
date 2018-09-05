const EmailAuth = require('../../../models/emailAuth');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

/**
 * 인증 email 전송
 * @param req
 * @param res
 */
exports.sendAuthEmail = (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email_id, // gmail 계정 아이디를 입력
      pass: process.env.email_password // gmail 계정의 비밀번호를 입력
    }
  });

  const token = randomstring.generate(8);
  const mailOptions = {
    from: process.env.email_id,
    to: email,

    subject: '안녕하세요, BlockOn 입니다. 이메일 인증을 해주세요.',
    html:
      '<p>BlockOn Email 인증</p>' +
      "<a href='" +
      process.env.blockon_uri +
      '/api/mypage/authEmail/?email=' +
      email +
      '&token=' +
      token +
      "'>인증하기</a>"
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
  });

  const createToken = emailAuth => {
    return new Promise((resolve, reject) => {
      if (emailAuth) {
        EmailAuth.updateToken(email, token).then(status => {
          if (status.n === 1) {
            resolve(emailAuth);
          } else {
            reject(new Error('error'));
          }
        });
      } else {
        resolve(EmailAuth.create(email, token));
      }
    });
  };

  EmailAuth.findOne({ email })
    .then(createToken)
    .then(emailAuth => {
      res.json({
        result: true,
        message: emailAuth
      });
    })
    .catch(err => {
      res.json({
        result: false,
        message: err
      });
    });
};

/**
 * 이메일 인증 - 인증 이메일에서 인증하기 버튼 클릭시 호출
 * @param req
 * @param res
 */
exports.authEmail = (req, res) => {
  const { email, token } = req.query;

  const rightToken = emailAuth => {
    return new Promise((resolve, reject) => {
      if (emailAuth.token === token) {
        if (emailAuth.status === false) {
          resolve(email);
        }
        reject('이미 인증되었습니다.');
      }
      reject('invalid token');
    });
  };

  const updateStatus = email => {
    return new Promise((resolve, reject) => {
      EmailAuth.updateStatus(email).then(result => {
        if (result.n === 1) {
          resolve(true);
        } else {
          reject('error');
        }
      });
    });
  };

  const respond = () => {
    res.send("<script>alert('인증 완료');close();</script>");
  };

  const onError = err => {
    res.send("<script>alert('" + err + "'); close();</script>");
  };

  EmailAuth.findOne({ email })
    .then(rightToken)
    .then(updateStatus)
    .then(respond)
    .catch(onError);
};
