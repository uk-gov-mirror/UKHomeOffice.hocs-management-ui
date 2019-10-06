const router = require('express').Router();
const { getTopic, getTopics , returnTopicJson, returnTopicsJson, getParentTopics, returnParentTopicsJson } = require('../../middleware/topic');

router.get('', getTopics, returnTopicsJson);
router.get('/:topicId', getTopic, returnTopicJson);
router.get('/parents', getParentTopics, returnParentTopicsJson);
router.post('/parents/{parentTopicUUID}');

module.exports = router;

