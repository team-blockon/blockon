const chat = require('express').Router();
const controller = require('./chat.controller');

chat.post('/', controller.getMessages);

module.exports = chat;
