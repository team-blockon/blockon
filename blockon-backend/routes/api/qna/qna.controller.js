const Qna = require('../../../models/qna');
const MailUtil = require('../../../lib/utils/MailUtil');

exports.save = (req, res) => {
  const { name, email, phone, feedback } = req.body;

  const respond = qna => {
    res.json({
      result: true,
      message: qna
    });
  };

  Qna.create(name, email, phone, feedback).then(respond);

  const subject = '[Blockon] 문의하신 내용이 접수되었습니다.';
  const html = `
  <p>안녕하세요. Blockon입니다.<br>
  회원님의 문의가 정상적으로 접수되었습니다.</p>
  빠른 시일 내에 답변드리겠습니다.`;

  MailUtil.send(email, subject, html);
};

exports.find = (req, res) => {
  const { complete } = req.query;

  const respond = qna => {
    res.json({
      result: true,
      message: qna
    });
  };

  Qna.find({ complete }).then(respond);
};
