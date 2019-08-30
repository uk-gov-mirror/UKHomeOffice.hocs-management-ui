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

async function returnTeamsJson(_req, res) {
    res.json({
        teams: res.locals.teams
    });
}

async function returnTeamMembersJson(_req, res) {
    res.json({
        teams: res.locals.teamMembers
    });
}

module.exports = {
    getTeams,
    getTeamMembers,
    returnTeamsJson,
    returnTeamMembersJson
}
