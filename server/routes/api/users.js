const router = require('express').Router();
const { addToTeam, getAllUsers, getUser, removeFromTeam, returnUsersJson, returnUserJson } = require('../../middleware/user');
const { getTeams, returnTeamsJson } = require('../../middleware/team');

router.post('/:userId/team/:teamId', addToTeam, getTeams, returnTeamsJson);

router.delete('/:userId/team/:teamId', removeFromTeam, getTeams, returnTeamsJson);

router.get('', getAllUsers, returnUsersJson);

router.get('/:userId', getUser, returnUserJson)

module.exports = router;
