const router = require('express').Router();
const { apiErrorMiddleware } = require('../middleware/request');

router.get('/api/form', (req, res) => res.json(req.form));

router.use('/api*', apiErrorMiddleware);

module.exports = router;