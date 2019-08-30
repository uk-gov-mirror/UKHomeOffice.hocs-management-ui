const router = require('express').Router();
const bodyParser = require('body-parser');
const apiTeamRouter = require('./team');
const apiUserRouter = require('./user');
const { apiErrorMiddleware } = require('../../middleware/request');

router.post('*', bodyParser.json(), bodyParser.urlencoded())
router.delete('*', bodyParser.json(), bodyParser.urlencoded())
router.use('/team', apiTeamRouter);
router.use('/user', apiUserRouter);
router.use('*', apiErrorMiddleware);

module.exports = router;
