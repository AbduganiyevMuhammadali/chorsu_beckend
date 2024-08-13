const express = require('express');
const router = express.Router();
const manualRasxodReagentController = require('../../controllers/admin-app/manualRasxodReagent.controller');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/all', auth(),  awaitHandlerFactory(manualRasxodReagentController.getAll));
router.get('/one/:id',  awaitHandlerFactory(manualRasxodReagentController.getOne));
router.get('/balance/:id',  awaitHandlerFactory(manualRasxodReagentController.getBalanceReagent));
router.post('/create',auth(), awaitHandlerFactory(manualRasxodReagentController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(manualRasxodReagentController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(manualRasxodReagentController.delete));

module.exports = router;