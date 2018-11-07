const user = require('express').Router();
const controller = require('./user.controller');

user.post('/find/klaytn', controller.getAccountByKlaytnAddress);
user.post('/find/email', controller.getAccountByEmail);
user.post('/email', controller.getEmailList);
user.put('/:ethAddress', controller.updateAccountByEthAddress);

module.exports = user;
