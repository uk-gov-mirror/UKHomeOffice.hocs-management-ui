const router = require('express').Router();
const { addTopic, getTopic, getTopics , returnTopicJson, returnTopicsJson, getParentTopics, returnParentTopicsJson, addDCUTeamsToTopic } = require('../../middleware/topic');

router.get('', getTopics, returnTopicsJson);
router.get('/:topicId', getTopic, returnTopicJson);
router.get('/parents', getParentTopics, returnParentTopicsJson);
router.post('/parents/:parentTopicId', addTopic);
router.post('/topic/:topicValue/private-minister/:privateMinisterValue/draft-qa/:draftQaValue/dcu', addDCUTeamsToTopic);


module.exports = router;

