const express = require('express');
const router = express.Router();
const surgeryController = require('../../controllers/admin-app/surgery.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {surgery}  = require('../../middleware/validators/admin-app/surgeryValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(surgeryController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(surgeryController.getOne));
router.post('/create',auth(), surgery, awaitHandlerFactory(surgeryController.create));
router.patch('/update/:id', auth(), surgery, awaitHandlerFactory(surgeryController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(surgeryController.delete));
module.exports = router;