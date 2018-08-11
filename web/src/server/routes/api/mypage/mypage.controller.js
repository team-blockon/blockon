const Account = require("../../../models/account");
const TokenUtil = require("../../util/TokenUtil");
const CryptoUtil = require("../../util/CryptoUtil");


/**
 * 회원정보에 접속하기 위해 패스워드 확인
 * @param req : token : 현재 로그인 된 아이디의 토큰, password: 회원정보에 접속 하기위한 패스워드 확인값
 * @param res
 */
exports.authPassword = (req, res) => {
    const { token, password } = req.body;

    const correctPassword = (tokenPassword, inputPassword) => {
        return new Promise((resolve, reject) => {
            if(tokenPassword !== inputPassword){
                reject(new Error("wrong password"));
            }else{
                resolve(true);
            }
        });
    };

    const respond = () => {
        res.json({
            result : true,
            message: "registered successfully"
        });
    };

    // 에러가 있을 때 실행되는 함수 (이미 존재하는 email)
    const onError = error => {
        res.status(409).json({
            result : false,
            message: error.message
        });
    };

    TokenUtil.decodeToken(token)
        .then( (decodedToken) => {
            return Account.findByEmail(decodedToken.email);
        })
        .then((account) => {
            let passwordHash = CryptoUtil.hashing(password);
            return correctPassword(account.password, passwordHash);
        })
        .then(respond)
        .catch(onError);
};

exports.authBudongsan = (req, res) => {

};