const express = require('express');
const router = express.Router();
const faceIdController = require('../../controllers/admin-app/faceIdController');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.post('/history-count', awaitHandlerFactory(faceIdController.getCounHistory));
router.post('/create-history', awaitHandlerFactory(faceIdController.createHistory));

module.exports = router;