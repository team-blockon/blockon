const auth = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../../middlewares/auth');

auth.post('/register', controller.register);
auth.post('/login', controller.login);
auth.post('/logout', controller.logout);

auth.use('/check', authMiddleware);
auth.get('/check');

module.exports = auth;
