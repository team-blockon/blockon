const router = require('express').Router();
const controller = require('./pdf.controller');

router.post('/', controller.pdf);
router.post('/fill', controller.fill);

module.exports = router;