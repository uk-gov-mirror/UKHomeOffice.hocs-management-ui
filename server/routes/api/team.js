const router = require('express').Router();
const {
    getTeams
} = require('../../middleware/teams');


router.get('', getTeams, (_req, res) => {
    res.json({
        teams: res.locals.teams
    });
});

module.exports = router;
