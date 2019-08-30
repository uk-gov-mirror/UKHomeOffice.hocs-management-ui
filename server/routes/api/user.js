const router = require('express').Router();
const { addToTeam } = require('../../middleware/user');
const { getTeams } = require('../../middleware/team');
const { returnTeamsJson } = require('./responseHelpers');

router.post('/:userId/team/:teamId', addToTeam, getTeams, returnTeamsJson);

module.exports = router;