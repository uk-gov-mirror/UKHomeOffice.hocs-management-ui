const router = require('express').Router();
const apiTeamRouter = require('./team')
const { apiErrorMiddleware } = require('../../middleware/request');

router.use('/team', apiTeamRouter);
router.use('*', apiErrorMiddleware);

module.exports = router;
