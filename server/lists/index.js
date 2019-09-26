const { infoService } = require('../clients/index');
const listService = require('../services/list');
const usersAdapter = require('./adapters/users');
const teamsAdapter = require('./adapters/teams');
const membersAdapter = require('./adapters/members');

module.exports = {
    lists: {
        USERS_IN_TEAM: {
            client: 'INFO',
            endpoint: '/teams/${teamId}/members',
            adapter: usersAdapter
        },
        MEMBER_LIST: {
            client: 'INFO',
            endpoint: '/member',
            adapter: membersAdapter
        },
        TEAMS: {
            client: 'INFO',
            endpoint: '/team',
            type: listService.types.DYNAMIC,
            adapter: teamsAdapter
        },
        USERS: {
            client: 'INFO',
            endpoint: '/users',
            type: listService.types.DYNAMIC,
            adapter: usersAdapter
        },
    },
    clients: {
        INFO: infoService
    }
};