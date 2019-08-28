const isProduction = process.env.NODE_ENV === 'production';
const workflowAuth = (process.env.REACT_APP_HOCS_WORKFLOW_BASIC_AUTH || 'UNSET:UNSET').split(':');

const config = {
        WORKFLOW_SERVICE: process.env.WORKFLOW_SERVICE || 'http://localhost:8081',
        WORKFLOW_BASIC_AUTH: process.env.REACT_APP_HOCS_WORKFLOW_BASIC_AUTH ?
            { username: workflowAuth[0], password: workflowAuth[1] } : null,
        INFO_SERVICE: process.env.REACT_APP_HOCS_INFO_SERVICE || 'http://localhost:8085'
    };

const auth = "Basic " + new Buffer(config.WORKFLOW_BASIC_AUTH.username + ":" + config.WORKFLOW_BASIC_AUTH.password).toString("base64");


const headers = {
    "Authorization" : auth
    // "X-Auth-Username":"minowner",
    // "X-Auth-Token":"1234",
    // "X-Auth-UserId":"968672ca-9fc1-491c-b2b9-d13c58b12d7a",
    // "X-Auth-Email":"test.user@test.url",
    // "X-Auth-Roles": "MANAGE_DOCUMENTS,TEST, DCU, CREATE_CASE, BULK_CREATE_CASE, REFRESH_MEMBERS",
    // "X-Auth-Groups":"RERERCIiIiIiIiIiIiIiIg,MzMzMzMzMzMzMzMzMzMzMw,EREREREREREREREREREREQ,Q0pOM0N_Tm2PBBTqQP2_og,iztDZqN8SLaydExQ-Ag4Qw",
    // "X-Auth-Subject":"968672ca-9fc1-491c-b2b9-d13c58b12d7a"
};

module.exports = {
    config,
    isProduction,
    headers
};
