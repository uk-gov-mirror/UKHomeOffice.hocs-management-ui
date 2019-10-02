const router = require('express').Router();
const { getParentTopics, returnParentTopicsJson } = require('../../middleware/topic');

router.get('/parent-topics', getParentTopics, returnParentTopicsJson);

module.exports = router;