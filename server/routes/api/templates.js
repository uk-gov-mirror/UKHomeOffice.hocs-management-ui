const router = require('express').Router();
const { fileMiddleware } = require('../../middleware/file');
const { addTemplate, deleteTemplate } = require('../../middleware/template');

router.post('', fileMiddleware.any(), addTemplate);

router.delete('/:uuid', deleteTemplate);

module.exports = router;
