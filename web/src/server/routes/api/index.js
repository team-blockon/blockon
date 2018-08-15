const api = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const pdf = require('./pdf');
const auth = require('./auth');
const user = require('./user');
const contract = require("./contract");
const mypage = require("./mypage");
const qna = require("./qna");

api.use('/pdf', pdf);
api.use('/auth', auth);
api.use('/user', authMiddleware);
api.use('/user', user);

api.use("/contract", contract);
api.use("/mypage", mypage);
api.use("/qna", qna);

module.exports = api;
