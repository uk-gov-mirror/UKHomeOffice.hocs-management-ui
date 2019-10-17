const timeout = {
    ERROR: 10000,
    STANDARD: 1000
};

const status = {
    REQUEST_PARENT_TOPICS: { display: 'Requesting parent topics', level: 1, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_PARENT_TOPICS_SUCCESS: { display: 'parent topics received', level: 3, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_PARENT_TOPICS_FAILURE: { display: 'Unable to fetch parent topics', level: 0, type: 'ERROR', timeoutPeriod: timeout.ERROR },
    REQUEST_TOPICS: { display: 'Requesting topics', level: 1, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_TOPICS_SUCCESS: { display: 'topics received', level: 3, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_TOPICS_FAILURE: { display: 'Unable to fetch topics', level: 0, type: 'ERROR', timeoutPeriod: timeout.ERROR },
    REQUEST_TEAMS: { display: 'Requesting teams', level: 1, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_TEAMS_SUCCESS: { display: 'teams received', level: 3, type: 'OK', timeoutPeriod: timeout.STANDARD },
    REQUEST_TEAMS_FAILURE: { display: 'Unable to fetch teams', level: 0, type: 'ERROR', timeoutPeriod: timeout.ERROR },
};

export default status;
