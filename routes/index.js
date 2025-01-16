const express = require('express');
const router = express.Router();

const BrowserManager = require('../controller/index.js');

router.post('/start', BrowserManager.start);
router.post('/stop', BrowserManager.stop);
router.post('/getActiveTabs', BrowserManager.getActiveTabs);
router.post('/cleanup', BrowserManager.cleanup);

module.exports = router;
