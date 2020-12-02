const express = require('express');

const router = express.Router();

const {
    create,
    verify,
    addFunds,
    addFundsOrg,
    makeReceiver,
    giveToReceivers,
    getFunds,
    getOrgs
} = require('./controller');

router.post('/create', create);
router.post('/verify', verify);
router.post('/addFunds', addFunds);
router.post('/addFundsOrg', addFundsOrg);
router.post('/makeReceiver', makeReceiver);
router.post('/giveToReceivers', giveToReceivers);
router.post('/getFunds', getFunds);
router.get('/getOrgs', getOrgs);

module.exports = router;