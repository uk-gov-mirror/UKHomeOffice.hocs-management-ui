const router = require('express').Router();
const { apiErrorMiddleware } = require('../../middleware/request');

router.use('*', apiErrorMiddleware);

module.exports = router;