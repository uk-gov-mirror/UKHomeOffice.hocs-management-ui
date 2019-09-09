const router = require('express').Router();
const { getTeam, getTeams, getTeamMembers, returnTeamJson, returnTeamsJson, returnTeamMembersJson } = require('../../middleware/team');

router.get('', getTeams, returnTeamsJson);

router.get('/:teamId', getTeam, returnTeamJson);

router.get('/:teamId/members', getTeamMembers, returnTeamMembersJson);

module.exports = router;
