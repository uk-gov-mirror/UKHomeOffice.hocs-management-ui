const router = require('express').Router();
const {
    addNominatedContact,
    getNominatedContactsForTeam,
    removeNominatedContactFromTeam,
    returnNominatedContactsJson
} = require('../../middleware/nominatedContact');

router.post('', addNominatedContact);
router.delete('/:teamUUID/:nominatedContactUUID', removeNominatedContactFromTeam);
router.get('/:teamId', getNominatedContactsForTeam, returnNominatedContactsJson);

module.exports = router;
