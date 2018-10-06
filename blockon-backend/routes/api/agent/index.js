const router = require('express').Router();
const { find, save, search } = require('./agent.controller');

router.get('/', find);
router.post('/', save);
router.post('/search', search);

module.exports = router;
