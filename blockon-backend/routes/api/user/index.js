const user = require('express').Router();
const controller = require('./user.controller');

user.post('/', controller.getAccount);
user.post('/email', controller.getEmailList);
user.put('/:ethAddress', controller.updateAccountByEthAddress);
user.put('/:ethAddress/address', controller.updateAccountAddressByEthAddress);

module.exports = user;
