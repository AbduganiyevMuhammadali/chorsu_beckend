const express = require('express');
const router = express.Router();
const PenaltyBonusController = require('../../controllers/admin-app/penaltyBonus.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  { penaltyBonusValidate }  = require('../../middleware/validators/admin-app/penaltyBonusValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(PenaltyBonusController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(PenaltyBonusController.getOne));
router.post('/create',auth(), penaltyBonusValidate , awaitHandlerFactory(PenaltyBonusController.create));
router.patch('/update/:id', auth(), penaltyBonusValidate, awaitHandlerFactory(PenaltyBonusController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(PenaltyBonusController.delete));
module.exports = router;