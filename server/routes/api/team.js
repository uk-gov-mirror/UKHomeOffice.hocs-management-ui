const router = require('express').Router();
const { getTeams } = require('../../middleware/team');
const { returnTeamsJson } = require('./responseHelpers');

router.get('', getTeams, returnTeamsJson);

module.exports = router;
