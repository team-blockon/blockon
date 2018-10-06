const router = require('express').Router();
const { save, find } = require('./qna.controller');

router.post('/', save);
router.get('/', find);

module.exports = router;
