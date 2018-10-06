const nodemailer = require('nodemailer');

exports.send = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email_id, // gmail 계정 아이디를 입력
      pass: process.env.email_password // gmail 계정의 비밀번호를 입력
    }
  });

  const mailOptions = {
    from: process.env.email_id,
    to: email,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
  });
};
