const router = require('express').Router();
const bodyParser = require('body-parser');
const apiTeamRouter = require('./teams');
const apiTopicsRouter = require('./topics');
const apiUnitRouter = require('./units');
const apiUserRouter = require('./users');
const { apiErrorMiddleware } = require('../../middleware/request');

router.post('*', bodyParser.json(), bodyParser.urlencoded())
router.delete('*', bodyParser.json(), bodyParser.urlencoded())
router.use('/teams', apiTeamRouter);
router.use('/topics', apiTopicsRouter);
router.use('/units', apiUnitRouter)
router.use('/users', apiUserRouter);
router.use('*', apiErrorMiddleware);

module.exports = router;
