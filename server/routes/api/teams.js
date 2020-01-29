const router = require('express').Router();
const { getTeam, getTeams, getTeamMembers, getTeamsForUser,returnTeamJson, returnTeamsJson, returnTeamMembersJson } = require('../../middleware/team');

router.get('', getTeams, returnTeamsJson);

router.get('/:teamId', getTeam, returnTeamJson);

router.get('/:teamId/members', getTeamMembers, returnTeamMembersJson);

router.get('/:userId/teams', getTeamsForUser, returnTeamsJson);

module.exports = router;
