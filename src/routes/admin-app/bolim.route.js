const express = require('express');
const router = express.Router();
const bolimController = require('../../controllers/admin-app/bolim.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(),  awaitHandlerFactory(bolimController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(bolimController.getOne));
router.post('/create',auth(), awaitHandlerFactory(bolimController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(bolimController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(bolimController.delete));
router.get('/dumper', auth(), awaitHandlerFactory(bolimController.dumper));
module.exports = router;