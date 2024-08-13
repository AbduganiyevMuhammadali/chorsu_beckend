const express = require('express');
const router = express.Router();
const userComeLeaveController = require('../../controllers/admin-app/userComeLeave.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.post('/daily-coming', awaitHandlerFactory(userComeLeaveController.getDailyComing));
router.post('/daily-penalty-bonus', awaitHandlerFactory(userComeLeaveController.getDailyPenalyBonus));
router.post('/change-penalty', awaitHandlerFactory(userComeLeaveController.changePenalty));

module.exports = router;