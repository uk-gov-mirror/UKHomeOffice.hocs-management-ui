const router = require('express').Router();
const { addUserToTeam } = require('../../middleware/teams');

router.post('/:userId/team/:teamId',
addUserToTeam,
(req, res) => res.json({ redirect: '/' })
);