const user = require('express').Router();
const controller = require('./user.controller');

user.get('/list', controller.list);
user.put('/:ethAddress', controller.updateAccountAddressByEthAddress);
user.post('/email', controller.getEmailList);
user.post('/', controller.getAccountAddressByEmail);

module.exports = user;
