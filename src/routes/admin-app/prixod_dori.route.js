const express = require('express');
const router = express.Router();
const prixod_dori_Controller = require('../../controllers/admin-app/prixod_dori.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {prixod_dori}  = require('../../middleware/validators/admin-app/prixod_doriValidator.middleware');
router.get('/all', auth(),  awaitHandlerFactory(prixod_dori_Controller.getAll));
router.get('/tovar', auth(),  awaitHandlerFactory(prixod_dori_Controller.getReagent));
router.get('/one/:id', auth(), awaitHandlerFactory(prixod_dori_Controller.getOne));
router.post('/create',auth(), prixod_dori, awaitHandlerFactory(prixod_dori_Controller.create));
router.patch('/update/:id', auth(), prixod_dori, awaitHandlerFactory(prixod_dori_Controller.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(prixod_dori_Controller.delete));

module.exports = router;