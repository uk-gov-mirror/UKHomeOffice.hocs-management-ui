const router = require('express').Router();
const { withdrawCase } = require('../../middleware/case');

router.post('', withdrawCase);

module.exports = router;
