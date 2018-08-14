const Account = require("../../../models/account");
const TokenUtil = require("../../util/TokenUtil");
const CryptoUtil = require("../../util/CryptoUtil");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

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

/**
 * 인증 email 전송
 * @param req
 * @param res
 */
exports.sendAuthEmail = (req, res) => {
    const { email } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email_id,  // gmail 계정 아이디를 입력
            pass: process.env.email_password          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: process.env.email_id,
        to: email,
        subject: '안녕하세요, BlockOne 입니다. 이메일 인증을 해주세요.',
        html: '<p>BlockOn Email 인증</p>' +
        "<a href='"+ process.env.blockon_uri +"/api/mypage/authEmail/?email="+ email +"&token=" + randomstring.generate(8) + "'>인증하기</a>"
    };

    transporter.sendMail(mailOptions, (err, info) =>{
        if(err) console.log(err);
        if(info) {
            transporter.close();
            console.log(JSON.stringify(info));
            res.json({
                result: true,
                message: JSON.stringify(info)
            });
        }
    });
};

/**
 * 이메일 인증
 * @param req
 * @param res
 */
exports.authEmail = (req, res) => {
    const {email, token} = req.query;

    console.log(email + token);

    res.send("<script>close()</script>");
};