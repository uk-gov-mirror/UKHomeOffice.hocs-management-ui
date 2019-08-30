async function returnTeamsJson(_req, res) {
    res.json({
        teams: res.locals.teams
    });
}
module.exports = { returnTeamsJson };
