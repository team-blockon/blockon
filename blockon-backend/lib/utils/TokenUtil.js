const jwt = require('jsonwebtoken');

/**
 * 토큰관련한 유틸
 */
class TokenUtil {
  static decodeToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) reject(err); // reject()를 실행하면 실패 상태
        console.log(decoded);
        resolve(decoded); // resolve()를 실행하면 완료 상태
      });
    });
  }
}

module.exports = TokenUtil;
