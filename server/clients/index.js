const { createClient } = require('../libs/request');

const {
    INFO_SERVICE,
    WORKFLOW_BASIC_AUTH,
    CASEWORK_SERVICE,
} = require('../config').forContext('server');

const infoService = createClient({
    baseURL: INFO_SERVICE,
    auth: WORKFLOW_BASIC_AUTH
});

const caseworkService = createClient({
    baseURL: CASEWORK_SERVICE,
    auth: WORKFLOW_BASIC_AUTH
});

module.exports = {
    infoService,
    caseworkService
};