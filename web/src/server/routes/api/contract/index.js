const contract = require('express').Router();
const controller = require('./contract.controller');

// contract.post('/', controller.isRightEmail);
contract.post('/', controller.addContract);
contract.post('/photo', controller.photo);
contract.post('/:index', controller.getContractByIndex);

module.exports = contract;
