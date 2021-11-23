const { infoService } = require('../clients');

const status = {
    READY: 'READY',
    FAIL: 'FAIL',
    NOT_READY: 'NOT_READY'
};

function liveness(req, res) {
    try {
        res.status(200).json({
            status: status.READY
        });
    } catch (e) {
        res.status(500).json({
            status: status.FAIL
        });
    }
}

async function readiness(req, res) {
    const setStatus = response => response.status === 200 ? status.READY : status.NOT_READY;
    const setResponseCode = (resources) => {
        return resources.info === status.READY;
    };
    const response = {};
    const resources = {};
    try {
        const info = await infoService.get('/actuator/health');
        resources.info = setStatus(info);
    } catch (e) {
        resources.info = status.FAIL;
    }
    response.code = setResponseCode(resources) ? 200 : 503;
    response.status = setResponseCode(resources) ? status.READY : status.NOT_READY;
    res.status(response.code).json({
        status: response.status,
        resources
    });
}

module.exports = {
    liveness,
    readiness
};
