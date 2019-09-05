const router = require('express').Router();
const { addToTeam, getAllUsers, removeFromTeam, returnUsersJson } = require('../../middleware/user');
const { getTeams, returnTeamsJson } = require('../../middleware/team');

router.post('/:userId/team/:teamId', addToTeam, getTeams, returnTeamsJson);

router.delete('/:userId/team/:teamId', removeFromTeam, getTeams, returnTeamsJson);

router.get('', getAllUsers, returnUsersJson);

module.exports = router;
