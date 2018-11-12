const MailUtil = require('../../../lib/utils/MailUtil');

exports.subscribe = (req, res) => {
  const { email } = req.body;

  const subject = '[Blockon] 출시 사전알림이 예약되었습니다.';
  const html = `<p>안녕하세요. Blockon입니다.<br>
  출시 사전알림이 정상적으로 예약되었습니다.</p>`;

  MailUtil.send(email, subject, html);
};
