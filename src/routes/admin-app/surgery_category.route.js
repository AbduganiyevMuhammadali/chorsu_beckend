const express = require('express');
const router = express.Router();
const surgery_categoryController = require('../../controllers/admin-app/surgery_category.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {surgeryCategory}  = require('../../middleware/validators/admin-app/surgeryCategoryValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(surgery_categoryController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(surgery_categoryController.getOne));
router.post('/create',auth(), surgeryCategory, awaitHandlerFactory(surgery_categoryController.create));
router.patch('/update/:id', auth(), surgeryCategory, awaitHandlerFactory(surgery_categoryController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(surgery_categoryController.delete));
module.exports = router;