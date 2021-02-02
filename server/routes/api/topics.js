const router = require('express').Router();
const { addTopic, addParentTopic, getTopic, getTopics , returnTopicJson, returnTopicsJson, getParentTopics, returnParentTopicsJson, addDCUTeamsToTopic } = require('../../middleware/topic');

router.get('', getTopics, returnTopicsJson);
router.get('/:topicId', getTopic, returnTopicJson);
router.get('/parents', getParentTopics, returnParentTopicsJson);
router.post('/parents/:parentTopicId', addTopic);
router.post('/parent', addParentTopic);
router.post('/dcu', addDCUTeamsToTopic);

module.exports = router;

