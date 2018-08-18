const router = require('express').Router();
const { find, save } = require('./agent.controller');

router.get('/', find);
router.post('/', save);

module.exports = router;
