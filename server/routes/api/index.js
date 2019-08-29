const router = require('express').Router();
const apiTeamRouter = require('./team');
const apiUserRouter = require('./user');
const { apiErrorMiddleware } = require('../../middleware/request');

router.use('/team', apiTeamRouter);
router.use('/user', apiUserRouter);
router.use('*', apiErrorMiddleware);

module.exports = router;
