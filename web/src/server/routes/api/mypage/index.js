const router = require('express').Router();
const { makeWallet, getWallet } = require('./mypage.controller');

router.post('/wallet', makeWallet);
router.get('/wallet/:ethAddress',getWallet);

module.exports = router;
