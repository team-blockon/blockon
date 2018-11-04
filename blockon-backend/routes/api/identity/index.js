const router = require('express').Router();

const { uploadIdentity, referenceIdentity,downloadIdentity, isRightIdentity, check } = require('./identity.controller');

router.post('/', uploadIdentity);
router.get('/:ethAddress', referenceIdentity);
router.get('/download/:ethAddress',downloadIdentity);
router.get('/check/agent', isRightIdentity);
router.post('/check/pdf', check);

module.exports = router;
