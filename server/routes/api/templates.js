const router = require('express').Router();
const { fileMiddleware } = require('../../middleware/file');
const { addTemplate } = require('../../middleware/template');

router.post('', fileMiddleware.any(), addTemplate);

module.exports = router;
