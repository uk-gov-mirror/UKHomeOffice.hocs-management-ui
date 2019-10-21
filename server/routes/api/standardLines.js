const router = require('express').Router();
const { fileMiddleware } = require('../../middleware/file');
const standardLine = require('../../middleware/standardLine');

router.post('', fileMiddleware.any(), standardLine);

module.exports = router;
