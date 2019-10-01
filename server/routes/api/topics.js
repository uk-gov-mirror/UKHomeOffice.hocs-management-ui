const router = require('express').Router();
const { getTopic, getTopics , returnTopicJson, returnTopicsJson } = require('../../middleware/topic');

router.get('', getTopics, returnTopicsJson);

router.get('/:topicId', getTopic, returnTopicJson);

module.exports = router;
