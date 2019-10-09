const router = require('express').Router();
const { addTopic, getTopic, getTopics , returnTopicJson, returnTopicsJson, getParentTopics, returnParentTopicsJson } = require('../../middleware/topic');

router.get('', getTopics, returnTopicsJson);
router.get('/:topicId', getTopic, returnTopicJson);
router.get('/parents', getParentTopics, returnParentTopicsJson);
router.post('/parents/:parentTopicId', addTopic);

module.exports = router;

