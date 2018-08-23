const user = require('express').Router();
const controller = require('./user.controller');

user.put('/:ethAddress', controller.updateAccountAddressByEthAddress);
user.post('/email', controller.getEmailList);
user.post('/', controller.getAccountAddress);

module.exports = user;
