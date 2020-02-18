const { createClient } = require('../libs/request'); 

const {
    INFO_SERVICE,
    WORKFLOW_BASIC_AUTH
} = require('../config').forContext('server');

const infoService = createClient({
    baseURL: INFO_SERVICE,
    auth: WORKFLOW_BASIC_AUTH
});

module.exports = {
    infoService
};