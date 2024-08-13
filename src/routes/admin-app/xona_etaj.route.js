const express = require('express');
const router = express.Router();
const xona_etajController = require('../../controllers/admin-app/xona_etaj.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');


router.get('/all', auth(),  awaitHandlerFactory(xona_etajController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(xona_etajController.getOne));
router.post('/create',auth(), awaitHandlerFactory(xona_etajController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(xona_etajController.update));
router.get('/palata-by-id/:id', auth(), awaitHandlerFactory(xona_etajController.getByIdPalata));
router.delete('/delete/:id', auth(), awaitHandlerFactory(xona_etajController.delete));
module.exports = router;