const express = require('express');
const router = express.Router();
const User = require('./model/User');


const bodyParser = require("body-parser");
// JSON 바디 파싱
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* 회원가입 테스트용 */
router.get('/signUp', (req,res,next) => {
   const id = req.params.id;

   User.find((err, users) => {
    res.json(users);
   });
});

/**
 * 회원가입
 * 암호화 미적용
 */
router.post('/signUp', (req,res,next) => {
    console.log('sign up start!');

    const { body : {id, pw}} = req;
    var user = new User({
        id : id,
        pw : pw
    });

    user.save( (err, user) => {
        if(err) return console.error(err);
        console.log('sign up end');
    });
});

module.exports = router;