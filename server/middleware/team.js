async function getTeams(req, res, next) {
    try {
        const response = await req.listService.fetch('TEAMS', req.params);
        res.locals.teams = response;
        next();
    } catch (error) {
        next(error);
    }
}

async function getTeamMembers(req, res, next) {
    try {
        const response = await req.listService.fetch('USERS_IN_TEAM', req.params);
        res.locals.teamMembers = response;
        next();
    } catch (error) {
        next(error);
    }
}

async function returnTeamsJson(_, { json, locals: { teams } }) {
    json({ teams });
}

async function returnTeamMembersJson(_, { json, locals: { teamMembers } }) {
    json({ teamMembers });
}

module.exports = {
    getTeams,
    getTeamMembers,
    returnTeamsJson,
    returnTeamMembersJson
}
