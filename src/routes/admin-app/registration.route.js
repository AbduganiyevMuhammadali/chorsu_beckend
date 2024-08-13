const express = require('express');
const router = express.Router();
// const registrationControl = require('../../controllers/admin-app/registration.controller');
const registrationControl = require('../../controllers/admin-app/registration.controller1');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const multer = require('multer');
const path = require('path');

const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

const  {registrationValidate}  = require('../../middleware/validators/admin-app/RegistrationValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(registrationControl.getAll));
router.post('/all', auth(), awaitHandlerFactory(registrationControl.getAllReg));
router.get('/inspec_all', auth(), awaitHandlerFactory(registrationControl.getAllRegIns));
router.post('/inspec_search', auth(), awaitHandlerFactory(registrationControl.RegInsSearchs));
router.get('/register_kassa', auth(), awaitHandlerFactory(registrationControl.registerAll));
router.get('/queue', auth(), awaitHandlerFactory(registrationControl.queueAll));
router.get('/kassaAll', auth(), awaitHandlerFactory(registrationControl.kassaAll));
router.get('/one/:id', auth(), awaitHandlerFactory(registrationControl.getOne));
router.get('/one_arxiv/:id', auth(), awaitHandlerFactory(registrationControl.getOneArxiv));
router.get('/palata/:id', auth(), awaitHandlerFactory(registrationControl.palataDel));
router.post('/create', auth(), registrationValidate, awaitHandlerFactory(registrationControl.create));
router.get('/pechat/:patient', auth(),  awaitHandlerFactory(registrationControl.getPechat));
router.get('/patient/:id', auth(),  awaitHandlerFactory(registrationControl.getByPatient));
router.post('/inspection', auth(),  awaitHandlerFactory(registrationControl.inspection));
router.post('/qaytarma', auth(),  awaitHandlerFactory(registrationControl.vazvrat));
router.post('/imtiyoz', auth(),  awaitHandlerFactory(registrationControl.Imtiyozli));
router.post('/search', auth(),  awaitHandlerFactory(registrationControl.search));
router.post('/search_palata', auth(),  awaitHandlerFactory(registrationControl.searchs_palata));
router.post('/searchs', auth(),  awaitHandlerFactory(registrationControl.searchs));
router.post('/insSverka', auth(),  awaitHandlerFactory(registrationControl.insSverka));
router.post('/inspectionSverka', auth(),  awaitHandlerFactory(registrationControl.InspectionSverka));
router.post('/palata', auth(),  awaitHandlerFactory(registrationControl.palata));
router.post('/kassa', auth(),  awaitHandlerFactory(registrationControl.kassa));
router.post('/kassasverka', auth(),  awaitHandlerFactory(registrationControl.kassaSverka));
router.post('/directhisobot', auth(),  awaitHandlerFactory(registrationControl.directHisobot));
router.post('/medHisobot', auth(),  awaitHandlerFactory(registrationControl.medHisobot));
router.post('/medSverka', auth(),  awaitHandlerFactory(registrationControl.medSverka));
router.post('/directSverka', auth(),  awaitHandlerFactory(registrationControl.directSverka));
router.post('/bemor', auth(),  awaitHandlerFactory(registrationControl.bemor));
router.patch('/update/:id', auth(), registrationValidate, awaitHandlerFactory(registrationControl.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(registrationControl.delete));
router.get('/statsionar', auth(), awaitHandlerFactory(registrationControl.statsionar));
router.post('/statsionar', auth(), awaitHandlerFactory(registrationControl.statsionarPost));
router.delete('/setEmptyQueue', auth(), awaitHandlerFactory(registrationControl.trancateQueue));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/a4/');  
    },
    filename: function(req, file, cb){
        req.body.image_name = new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname);
        return cb(null, req.body.image_name);
    }
})


var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 10
    }
}).single('image_name');

router.post('/upload-a4', upload, awaitHandlerFactory(registrationControl.uploadA4Image));






module.exports = router;