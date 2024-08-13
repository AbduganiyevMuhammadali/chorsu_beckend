const express = require('express');
const router = express.Router();
const hisobotController = require('../../controllers/admin-app/hisobot');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.post('/doctor_hisobot', auth(), awaitHandlerFactory(hisobotController.doctorHisobot));
router.post('/doctor_sverka', auth(), awaitHandlerFactory(hisobotController.DoctorSverka));
router.post('/inspection_hisobot', auth(), awaitHandlerFactory(hisobotController.inspection));
router.post('/inspection_sverka', auth(), awaitHandlerFactory(hisobotController.InspectionSverka));
router.post('/direct_hisobot', auth(), awaitHandlerFactory(hisobotController.directHisobot));
router.post('/direct_sverka', auth(), awaitHandlerFactory(hisobotController.directSverka));
router.post('/med_hisobot', auth(), awaitHandlerFactory(hisobotController.medHisobot));
router.post('/med_sverka', auth(), awaitHandlerFactory(hisobotController.medSverka));
router.post('/pastavchik_hisobot', auth(), awaitHandlerFactory(hisobotController.pastavchikHisobot));
router.post('/pastavchik_sverka', auth(), awaitHandlerFactory(hisobotController.pastavchikSverka));
router.post('/reagent_hisobot', auth(), awaitHandlerFactory(hisobotController.ReagentHisobot));
router.post('/reagent_sverka', auth(), awaitHandlerFactory(hisobotController.ReagentSverka));
router.post('/kassa_sverka', auth(), awaitHandlerFactory(hisobotController.kassaSverka));
router.post('/statsionar', auth(), awaitHandlerFactory(hisobotController.Statsionar));
router.post('/surgery_sverka', auth(), awaitHandlerFactory(hisobotController.surgerySverka))
router.post('/surgery_hisobot', auth(), awaitHandlerFactory(hisobotController.surgeryHisobot))
router.post('/surgery_category_sverka', auth(), awaitHandlerFactory(hisobotController.surgeryCategorySverka))
router.post('/surgery_category_hisobot', auth(), awaitHandlerFactory(hisobotController.surgeryCategoryHisobot))
router.post('/palata_hisobot', auth(), awaitHandlerFactory(hisobotController.palataHisobot))
router.post('/palata_sverka', auth(), awaitHandlerFactory(hisobotController.palataSverka))
router.post('/labarant_sverka', auth(), awaitHandlerFactory(hisobotController.LabarantSverka))
router.post('/labarant_hisobot', auth(), awaitHandlerFactory(hisobotController.LabarantHisobot))
router.post('/patient_hisobot', auth(), awaitHandlerFactory(hisobotController.patientHisobot))
router.post('/patient_revision', auth(), awaitHandlerFactory(hisobotController.patientInspection))
router.post('/patient-count-palata', auth(), awaitHandlerFactory(hisobotController.palataByDoctorHisobot))
router.post('/patient-count-sverka-palata', auth(), awaitHandlerFactory(hisobotController.palataByDoctorSverka))
router.post('/surgery-by-doctor', auth(), awaitHandlerFactory(hisobotController.surgeryByDoctorHisobot))
router.post('/each-surgery-by-doctor', auth(), awaitHandlerFactory(hisobotController.EachSurgeryByDoctorHisobotEach))
router.post('/surgery-by-doctor-sverka', auth(), awaitHandlerFactory(hisobotController.SurgeryByDoctorSverka))


module.exports = router;