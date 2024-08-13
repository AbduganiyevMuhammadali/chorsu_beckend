const express = require('express');
const router = express.Router();
const inspectionController = require('../../controllers/admin-app/inspection.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
// const  {InspectionsVAlidator}  = require('../../middleware/validators/admin-app/InspectionsValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(inspectionController.getAll));
router.get('/ins_all', auth(),  awaitHandlerFactory(inspectionController.all));
router.get('/bolim', auth(),  awaitHandlerFactory(inspectionController.bolim));
router.get('/tekshiruv/:id', auth(),  awaitHandlerFactory(inspectionController.tekshiruv));
router.get('/child/:id', auth(),  awaitHandlerFactory(inspectionController.child));
router.get('/one/:id', auth(),  awaitHandlerFactory(inspectionController.getOne));
router.post('/create', auth(), awaitHandlerFactory(inspectionController.create));
router.post('/uzi', auth(), awaitHandlerFactory(inspectionController.tekshiruvUzi));
router.patch('/update/:id', auth(), awaitHandlerFactory(inspectionController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(inspectionController.delete));
module.exports = router;