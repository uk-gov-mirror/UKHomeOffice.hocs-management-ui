const router = require('express').Router();
const { getTeams, getTeamMembers, returnTeamsJson, returnTeamMembersJson } = require('../../middleware/team');

router.get('', getTeams, returnTeamsJson);

router.get('/:teamId/members', getTeamMembers, returnTeamMembersJson);

module.exports = router;
