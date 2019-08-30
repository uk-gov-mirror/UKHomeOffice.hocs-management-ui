const router = require('express').Router();
const { addToTeam } = require('../../middleware/user');
const { getTeams, returnTeamsJson } = require('../../middleware/team');

router.post('/:userId/team/:teamId', addToTeam, getTeams, returnTeamsJson);

module.exports = router;
