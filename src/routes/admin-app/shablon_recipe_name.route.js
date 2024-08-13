const express = require('express');
const router = express.Router();
const shablon_recipeController = require('../../controllers/admin-app/shablon_recipe_name.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {districtValidate}  = require('../../middleware/validators/admin-app/expenseValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(shablon_recipeController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(shablon_recipeController.getOne));
router.post('/create',auth(), awaitHandlerFactory(shablon_recipeController.create));
router.post('/shablonOne',auth(), awaitHandlerFactory(shablon_recipeController.shablonDoctor));
router.patch('/update/:id', auth(), awaitHandlerFactory(shablon_recipeController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(shablon_recipeController.delete));
module.exports = router;