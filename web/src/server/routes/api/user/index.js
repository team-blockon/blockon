const user = require('express').Router();
const controller = require('./user.controller');

user.get('/list', controller.list);

module.exports = user;
