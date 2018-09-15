const auth = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../../middlewares/auth');

auth.post('/profile', controller.profile);
auth.post('/register', controller.register);
auth.post('/login', controller.login);
auth.post('/logout', controller.logout);
auth.post('/sendAuthEmail', controller.sendAuthEmail);
auth.get('/authEmail', controller.authEmail);

auth.use('/check', authMiddleware);
auth.get('/check');

module.exports = auth;
