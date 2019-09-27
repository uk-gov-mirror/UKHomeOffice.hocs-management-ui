const timeout = {
    ERROR: 10000,
    STANDARD: 5000
};

const status = {
    REQUEST_PARENT_TOPICS: { display: 'Requesting parent topics', level: 1, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_PARENT_TOPICS_SUCCESS: { display: 'parent topics received', level: 3, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_PARENT_TOPICS_FAILURE: { display: 'Unable to fetch parent topics', level: 0, type: 'ERROR', timeoutPeriod: timeout.ERROR },
};

export default status;