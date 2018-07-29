const jwt = require("jsonwebtoken");

/**
 * JWT 토큰을 필요로 하는 요청에 토큰을 검증하는 미들웨어
 * @param req 토큰을 헤더의 x-access-token이나 쿼리 파라미터의 token으로 전달받음
 * @param res
 * @param next 토큰 검증에 성공했을 때, 다음 미들웨어를 실행하는 함수
 */
const authMiddleware = (req, res, next) => {
  // 헤더나 쿼리 파라미터에서 JWT 토큰 읽기
  const token = req.headers["x-access-token"] || req.query.token;

  // JWT 토큰이 존재하지 않으면, 로그인되지 않았다고 JSON 응답
  if (!token) {
    return res.json({
      success: false,
      message: "not logged in",
        info: undefined
    });
  }

  // 토큰을 디코드하는 Promise 생성
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) reject(err); // reject()를 실행하면 실패 상태
      resolve(decoded); // resolve()를 실행하면 완료 상태
    });
  });

  // 토큰 검증에 실패하면, 에러 메시지를 JSON 응답
  const onError = error => {
    res.status(403).json({
      success: false,
      message: error.message,
        info: undefined
    });
  };

  // Promise 실행
  p
    // resolve()의 결과 값 decoded를 decoded로 받음
    .then(decoded => {
        res.json({
            success: true,
            message: "logged in",
            info : decoded.email
        });
      next(); // 다음 미들웨어 실행
    })
    // reject()의 결과 값 err을 error로 받음
    .catch(onError);
};

module.exports = authMiddleware;
