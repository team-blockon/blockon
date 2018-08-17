const landing = require('express').Router();
const controller = require('./landing.controller');

landing.post('/subscribe', controller.subscribe);

module.exports = landing;
