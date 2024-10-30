const express = require('express');

const router = express.Router();

const {
    create,
    createOrg,
    verify,
    addFunds,
    addFundsOrg,
    makeReceiver,
    giveToReceivers
} = require('./controller');

router.post('/create', create);
router.post('/createOrg', createOrg);
router.post('/verify', verify);
router.post('/addFunds', addFunds);
router.post('/addFundsOrg', addFundsOrg);
router.post('/makeReceiver', makeReceiver);
router.post('/giveToReceivers', giveToReceivers);

module.exports = router;