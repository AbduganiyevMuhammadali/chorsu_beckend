const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/admin-app/user.route');
const roomRouter = require('../routes/admin-app/room.route');
const districtRouter = require('../routes/admin-app/district.route')
const doctorRouter = require('../routes/admin-app/doctor.route');
const patientRouter = require('../routes/admin-app/patient.route');
const pillRouter = require('../routes/admin-app/pill.route');
const queueRouter = require('../routes/admin-app/queue.route');
const regionRouter = require('../routes/admin-app/region.route');
const inspectionRouter = require('../routes/admin-app/inspection.route');
const Doctor_templateRouter = require('../routes/admin-app/doctor_template.route');
const doctor_categoryRouter = require('../routes/admin-app/doctor_category.route');
const inspector_categoryRouter = require('../routes/admin-app/inspector_category.route');
const shablon_recipeRouter = require('../routes/admin-app/shablon_recipe_name.route')
const registerRouter = require('../routes/admin-app/registration.route')
const kassa_orderRouter = require('../routes/admin-app/kassa_order.route')
const expenseRouter = require('../routes/admin-app/expense.route')
const palataRouter = require('../routes/admin-app/palata.route')
const RegDoctor = require('../routes/admin-app/registerDoctor.route')
const UploadRouter = require('../routes/admin-app/upload.route')
const imgRouter = require('../routes/admin-app/upload_img.route')
const arxiv = require('../routes/admin-app/registration_arxiv.route')
const uplata = require('../routes/admin-app/uplate')
const shablon_Doctor = require('../routes/admin-app/shablon_doctor.route')
const register_mkb = require('../routes/admin-app/register_mkb.route')
const inspection_info = require('../routes/admin-app/inspection_info.route')
const directRouter = require('../routes/admin-app/direct.route')
const med_directRouter = require('../routes/admin-app/med_direct.route')
const ReagentRouter = require('../routes/admin-app/reagent.route')
const pastavchikRouter = require('../routes/admin-app/pastavchik.route')
const prixodRouter = require('../routes/admin-app/prixod.route')
const prixodDoriRouter = require('../routes/admin-app/prixod_dori.route')
const pastavchikPay = require('../routes/admin-app/pastavchik_pay.route')
const reagentDepartment = require('../routes/admin-app/reagent_department.route')
const department = require('../routes/admin-app/department.route')
const HisobotRouter = require('../routes/admin-app/hisobot')
const surgeryRouter = require('../routes/admin-app/surgery.route')
const bolimRouter = require('../routes/admin-app/bolim.route')
const PalataEtaj = require('../routes/admin-app/palata_category.route')
const XonaEtaj = require('../routes/admin-app/xona_etaj.route')
const surgeryCategoryRouter = require('../routes/admin-app/surgery_category.route')
const surgeryParentRouter = require('../routes/admin-app/surgery_parent.route');
const faceIdRouter = require('../routes/admin-app/faceId.route');
const penaltyBonusRouter = require('../routes/admin-app/penaltybonus.route');
const userComeLeaveRouter = require('../routes/admin-app/user-come-leave.route');
const manualRasxodReagentRouter = require('../routes/admin-app/manualRasxodReagent.route');

const HttpException = require('../utils/HttpException.utils');

module.exports = function(app){
        // parse requests of content-type: application/json
        // parses incoming requests with JSON payloads
        app.use(express.json());
        // enabling cors for all requests by using cors middleware
        app.use(cors());
        // Enable pre-flight
        app.options("*", cors());
        app.use(`/api/v1/admin-app/user`, userRouter);
        app.use(`/api/v1/admin-app/room`, roomRouter);
        app.use(`/api/v1/admin-app/doctor`, doctorRouter);
        app.use(`/api/v1/admin-app/inspection`, inspectionRouter);
        app.use(`/api/v1/admin-app/district`, districtRouter);
        app.use(`/api/v1/admin-app/patient`, patientRouter);
        app.use(`/api/v1/admin-app/pill`, pillRouter);
        app.use(`/api/v1/admin-app/queue`, queueRouter);
        app.use(`/api/v1/admin-app/region`, regionRouter);
        app.use(`/api/v1/admin-app/registration`, registerRouter);
        app.use(`/api/v1/admin-app/doctor_template`, Doctor_templateRouter);
        app.use(`/api/v1/admin-app/doctor_category`, doctor_categoryRouter);
        app.use(`/api/v1/admin-app/inspector_category`, inspector_categoryRouter);
        app.use(`/api/v1/admin-app/kassa_order`, kassa_orderRouter);
        app.use(`/api/v1/admin-app/expense`, expenseRouter);
        app.use(`/api/v1/admin-app/palata`, palataRouter);
        app.use(`/api/v1/admin-app/register_doctor`, RegDoctor);
        app.use(`/api/v1/admin-app/upload`, UploadRouter);
        app.use(`/api/v1/admin-app/uploads`, imgRouter);
        app.use(`/api/v1/admin-app/arxiv`, arxiv);
        app.use(`/api/v1/admin-app/uplata`, uplata);
        app.use(`/api/v1/admin-app/shablon_doctor`, shablon_Doctor);
        app.use(`/api/v1/admin-app/register_mkb`, register_mkb);
        app.use(`/api/v1/admin-app/info`, inspection_info);
        app.use(`/api/v1/admin-app/direct`, directRouter);
        app.use(`/api/v1/admin-app/med_direct`, med_directRouter);
        app.use(`/api/v1/admin-app/reagent`, ReagentRouter);
        app.use(`/api/v1/admin-app/pastavchik`, pastavchikRouter);
        app.use(`/api/v1/admin-app/prixod`, prixodRouter);
        app.use(`/api/v1/admin-app/prixod-dori`, prixodDoriRouter);
        app.use(`/api/v1/admin-app/pastavchik_pay`, pastavchikPay);
        app.use(`/api/v1/admin-app/reagent_department`, reagentDepartment);
        app.use(`/api/v1/admin-app/department`, department);
        app.use(`/api/v1/admin-app/hisobot`, HisobotRouter);
        app.use(`/api/v1/admin-app/surgery`, surgeryRouter);
        app.use(`/api/v1/admin-app/surgery_category`, surgeryCategoryRouter);
        app.use(`/api/v1/admin-app/bolim`, bolimRouter);
        app.use(`/api/v1/admin-app/palata_category`, PalataEtaj);
        app.use(`/api/v1/admin-app/xona_etaj`, XonaEtaj);
        app.use(`/api/v1/admin-app/surgery-parent`, surgeryParentRouter);
        app.use(`/api/v1/admin-app/face-id`, faceIdRouter);
        app.use(`/api/v1/admin-app/penalty-bonus`, penaltyBonusRouter);
        app.use(`/api/v1/admin-app/shablon_recipe`, shablon_recipeRouter);
        app.use(`/api/v1/admin-app/user-come-leave`, userComeLeaveRouter);
        app.use(`/api/v1/admin-app/manual-rasxod-reagent`, manualRasxodReagentRouter);

        app.use(`/api/v1/admin-app/`, express.static('upload'));
        app.use(`/api/v1/admin-app/a4`, express.static('uploads/a4'));
        app.use(`/api/v1/admin-app/backups`, express.static('backups'));

        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, 'Endpoint Not Found');
            next(err);
        });
        
        app.use(errorMiddleware);
}