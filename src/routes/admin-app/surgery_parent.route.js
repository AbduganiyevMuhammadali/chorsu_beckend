const express = require('express');
const router = express.Router();
const surgeryParentController = require('../../controllers/admin-app/surgery_parent.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  { surgeryParent }  = require('../../middleware/validators/admin-app/surgeryParentValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(surgeryParentController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(surgeryParentController.getOne));
router.post('/create',auth(), surgeryParent, awaitHandlerFactory(surgeryParentController.create));
router.patch('/update/:id', auth(), surgeryParent, awaitHandlerFactory(surgeryParentController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(surgeryParentController.delete));

module.exports = router;