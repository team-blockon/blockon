const router = require('express').Router();

const { uploadIdentity, referenceIdentity,downloadIdentity, setAgent } = require('./identity.controller');

router.post('/', uploadIdentity);
router.get('/:accountAddress', referenceIdentity);
router.get('/download/:accountAddress',downloadIdentity);
router.post('/setAgent', setAgent);
// router.get('/check/agent', isRightIdentity);
// router.post('/check/pdf', check);

module.exports = router;
