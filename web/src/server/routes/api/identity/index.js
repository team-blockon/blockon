const router = require('express').Router();

const { uploadIdentity, referenceIdentity,downloadIdentity } = require('./identity.controller');

router.post('/', uploadIdentity);
router.get('/:ethAddress', referenceIdentity);
router.get('/download/:ethAddress',downloadIdentity);

module.exports = router;
