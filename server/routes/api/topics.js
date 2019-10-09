const router = require('express').Router();
const { addTopic, getParentTopics, returnParentTopicsJson } = require('../../middleware/topic');

router.get('/parents', getParentTopics, returnParentTopicsJson);
router.post('/parents/:parentTopicId', addTopic);

module.exports = router;