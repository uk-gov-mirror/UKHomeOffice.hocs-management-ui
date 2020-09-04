const router = require('express').Router();
const { getEntityList, returnEntityListJson, addEntityListItem } = require('../../middleware/entityList');

router.get('/:listName', getEntityList, returnEntityListJson);
router.post('/:listName', addEntityListItem);

module.exports = router;
