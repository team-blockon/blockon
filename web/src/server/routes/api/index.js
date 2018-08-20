const api = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const auth = require('./auth');
const user = require('./user');
const contract = require('./contract');
const mypage = require('./mypage');
const qna = require('./qna');
const agent = require('./agent');
const landing = require('./landing');

api.use('/auth', auth);
// api.use('/user', authMiddleware);
api.use('/user', user);

api.use('/contract', contract);
api.use('/mypage', mypage);
api.use('/qna', qna);
api.use('/agent', agent);
api.use('/landing', landing);

module.exports = api;
