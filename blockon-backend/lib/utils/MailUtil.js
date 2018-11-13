const nodemailer = require('nodemailer');

exports.send = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID, // gmail 계정 아이디를 입력
      pass: process.env.EMAIL_PASSWORD // gmail 계정의 비밀번호를 입력
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
  });
};
