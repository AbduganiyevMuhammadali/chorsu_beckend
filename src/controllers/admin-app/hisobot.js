const DoctorModel = require("../../models/doctor.model");
const palataModel = require("../../models/palata.model");
const pastavchikModel = require("../../models/pastavchik.model");
const reagentModel = require("../../models/reagent.model");
const reagentDepartmentModel = require("../../models/reagent_department.model");
const register_directModel = require("../../models/register_direct.model");
const register_doctorModel = require("../../models/register_doctor.model");
const Register_inspectionModel = require("../../models/register_inspection.model");
const Register_kassaModel = require("../../models/register_kassa.model");
const register_med_directModel = require("../../models/register_med_direct.model");
const register_reagentModel = require("../../models/register_reagent.model");
const register_supplierModel = require("../../models/register_supplier.model");
const registration_palataModel = require("../../models/registration_palata.model");
const RegisterPalataModel = require('../../models/register_palata.model');
const doctorCategory = require("../../models/doctor_category.model");
const inspectionCategory = require("../../models/inspector_category.model");
const {Op, QueryTypes} = require("sequelize");
const sequelize = require("sequelize");
const sequelizeInstance = require('../../db/db-sequelize');
const RegistrationModel = require("../../models/registration.model");
const PatientModel = require("../../models/patient.model");
const directModel = require("../../models/direct.model");
const med_directModel = require("../../models/med_direct.model");
const UserModel = require('../../models/user.model')
const Registration_doctorModel = require('../../models/registration_doctor.model')
const Registration_recipeModel = require('../../models/registration_recipe.model')
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const xona_etajModel = require("../../models/xona_etaj.model");
const palata_categoryModel = require("../../models/palata_category.model");
const register_surgeryModel = require("../../models/register_surgery.model");
const surgerygModel = require("../../models/surgery");
const surgery_category_register = require("../../models/surgery_category_register");
const surgeryCategoryModel = require("../../models/surgery_category");
const register_palataModel = require("../../models/register_palata.model");
const RoomModel = require("../../models/room.model");
const registerUserModel = require("../../models/register_user.model");
const HttpException = require("../../utils/HttpException.utils");
const reg_doctor_categoryModel = require("../../models/reg_doctor_category.model");
const SurgeryRegistration = require('../../models/suergery.register');
const InspectionModel = require('../../models/inspection.model');
const inspectionModel = require("../../models/inspection.model");
class HisobotController {
    patientInspection = async (req, res, next) => {
        const { datetime1, datetime2, category_id } = req.body;
        let query = {};
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if(category_id) {
            query.category_id = category_id
        }
        const result = await Registration_inspectionModel.findAll({
            attributes: ['id', 'price', 'category_id', 'date_time', 'skidka', 'select'],
            include: [
                {
                    model: InspectionModel,
                    as: 'inspection',
                    required: false
                },
                {
                  model: inspectionCategory,
                  as: 'category',
                  required: false  
                },
                {
                    model: PatientModel,
                    as: 'patient',
                    required: false,
                    attributes: ['id', 'fullname', 'birthday']
                }
            ],
            where: query
        })
        let queryx = {};
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let queryp = {
            date_to: {
                [Op.gte]: datetime1,
            },
            date_do: {
                [Op.lte]: datetime2
            }
        };
        let resultx = [];
        let resultRegDoc = [];
        let surgery = [];
        let palatas = [];
        if(!category_id) {
            // resultx = await Registration_doctorModel.findAll({
            //     include: [
            //         {
            //             model: DoctorModel,
            //             as: 'doctor',
            //             attributes: ['id', 'name'],
            //             required: false,
            //         },
            //         {
            //             model: PatientModel,
            //             as: 'patient',
            //             required: false,
            //             attributes: ['id', 'fullname', 'birthday']
            //         }
            //     ],
            //     where: queryx,
            // })
            resultRegDoc = await reg_doctor_categoryModel.findAll({
                include: [
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false,
                        attributes: ['id', 'fullname', 'birthday']
                    },
                    {
                        model: DoctorModel,
                        as: 'doctor',
                        required: false,
                        attributes: ['id', 'name'],
                    }
                ],
                where: queryx
            })
            surgery = await SurgeryRegistration.findAll({
                include: [
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false,
                        attributes: ['id', 'fullname', 'birthday']
                    },
                    {
                       model: DoctorModel,
                       as: 'doctor',
                       required: false,
                       attributes: ['id', 'name'],
                    },
                    {
                        model: surgerygModel,
                        as: 'surgery',
                        required: false,
                    }
                ]
            })
            palatas = await registration_palataModel.findAll({
                attributes: [
                    [sequelize.literal("SUM(`total_price`)"), 'summa'],
                    [sequelize.literal("COUNT(`palata_id`)"), 'count'],
                ],
                include: [
                    {
                        model: palataModel,
                        as: 'palatas',
                        required: false
                    },
                    {
                        model: UserModel,
                        as: 'user',
                        required: false,
                        attributes: ['id', 'user_name']
                    },
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false,
                        attributes: ['id', 'fullname', 'birthday']
                    }
                ],
                group: ['registration_id'],
                where: queryp
            })
        }

        res.send({
            inspections: result,
            // doctors: resultx,
            cat_doctors: resultRegDoc,
            surgeries: surgery,
            palatas: palatas
        })
    }
    patientInspection = async (req, res, next) => {
        const { datetime1, datetime2, category_id } = req.body;
        let query = {};
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if(category_id) {
            query.category_id = category_id
        }
        const result = await Registration_inspectionModel.findAll({
            attributes: ['id', 'price', 'category_id', 'date_time', 'skidka', 'select'],
            include: [
                {
                    model: InspectionModel,
                    as: 'inspection',
                    required: false
                },
                {
                  model: inspectionCategory,
                  as: 'category',
                  required: false  
                },
                {
                    model: PatientModel,
                    as: 'patient',
                    required: false,
                    attributes: ['id', 'fullname', 'birthday']
                }
            ],
            where: query
        })
        let queryx = {};
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let queryp = {
            date_to: {
                [Op.gte]: datetime1,
            },
            date_do: {
                [Op.lte]: datetime2
            }
        };
        let resultx = [];
        let resultRegDoc = [];
        let surgery = [];
        let palatas = [];
        if(!category_id) {
            // resultx = await Registration_doctorModel.findAll({
            //     include: [
            //         {
            //             model: DoctorModel,
            //             as: 'doctor',
            //             attributes: ['id', 'name'],
            //             required: false,
            //         },
            //         {
            //             model: PatientModel,
            //             as: 'patient',
            //             required: false,
            //             attributes: ['id', 'fullname', 'birthday']
            //         }
            //     ],
            //     where: queryx,
            // })
            resultRegDoc = await reg_doctor_categoryModel.findAll({
                include: [
                    {
                        model: DoctorModel,
                        as: 'doctor',
                        required: false,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false,
                        attributes: ['id', 'fullname', 'birthday']
                    }
                ],
                where: queryx
            })
            surgery = await SurgeryRegistration.findAll({
                include: [
                    {
                       model: DoctorModel,
                       as: 'doctor',
                       required: false,
                       attributes: ['id', 'name'],
                    },
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false,
                        attributes: ['id', 'fullname', 'birthday']
                    },
                    {
                        model: surgerygModel,
                        as: 'surgery',
                        required: false,
                    }
                ]
            })
            palatas = await registration_palataModel.findAll({
                attributes: [
                    [sequelize.literal("SUM(`total_price`)"), 'summa'],
                    [sequelize.literal("COUNT(`palata_id`)"), 'count'],
                ],
                include: [
                    {
                        model: palataModel,
                        as: 'palatas',
                        required: false
                    },
                    {
                        model: UserModel,
                        as: 'user',
                        required: false,
                        attributes: ['id', 'user_name']
                    },
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false,
                        attributes: ['id', 'fullname', 'birthday']
                    }
                ],
                group: ['registration_id'],
                where: queryp
            })
        }

        res.send({
            inspections: result,
            // doctors: resultx,
            cat_doctors: resultRegDoc,
            surgeries: surgery,
            palatas: palatas
        })
    }
    directSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
                [sequelize.literal('direct.name'), 'direct_name'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'Chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ], 
           include: [
              {model: directModel, as: 'direct', attributes: []}
           ],
           where: queryx,
           group: ['id'],
           order: [
            ['id', 'DESC']
           ]
           
        })
        model.forEach(val=> {
            if(val.dataValues.end_total == 0){
                model = [];
                model.push(val)
            }
        })
       res.send(model)
    };
    
    medHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        let model = await register_med_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal('med_direct.name'), 'med_name'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'Chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("COUNT(Case WHEN register_med_direct.date_time >=" + datetime1 + " and register_med_direct.date_time <= " + datetime2 + ` and register_med_direct.direct_id != null then register_med_direct.direct_id else 0 end)`), 'count']
           ],
           include: [
            {model: med_directModel, as: 'med_direct', attributes: []}
           ],
           where: queryx,
           group: ['direct_id']
        })
        res.send(model)
    };
    
    medSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        let model = await register_med_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
                [sequelize.literal('med_direct.name'), 'med_name'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'kirim' THEN register_med_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time >= " + datetime1 + " and register_med_direct.date_time <= " + datetime2 + " AND register_med_direct.doc_type = 'Chiqim' THEN register_med_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_med_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ], 
           include: [
            {model: med_directModel, as: 'med_direct', attributes: []}
           ],
           where: queryx,
           group: ['id'],
           order: [
            ['id', 'DESC']
           ]
           
        })
        res.send(model)
    };
    directHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        let model = await register_directModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
                [sequelize.literal('direct.name'), 'direct_name'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.summa ELSE 0 END)"), 'umumiy_sum'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'Chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("COUNT(Case WHEN register_direct.date_time >=" + datetime1 + " and register_direct.date_time <= " + datetime2 + ` and register_direct.direct_id = ${body.direct_id} then register_direct.direct_id else 0 end)`), 'count']
           ],
           include: [
            {model: directModel, as: 'direct', attributes: []}
         ],
           where: queryx,
           group: ['direct_id']
        })
        model.forEach(val=> {
            if(val.dataValues.id == null){
                model = [];
                model.push(val)
            }
        })
        res.send(model)
    };
    inspection = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        if(body.inspection_category !== null){
            queryx.id = {[Op.eq] : body.inspection_category }  
            query.inspection_category = {[Op.eq]: body.inspection_category}
            
        };
          
        let result = await Register_inspectionModel.findAll({
            attributes: [
                 'id', "type", "date_time", "inspection_category", "doc_id","comment",
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'Chiqim' THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " THEN register_inspection.doctor_price ELSE 0 END)"), 'total_doctor_price'],
                [sequelize.literal("COUNT(Case WHEN register_inspection.date_time >=" + datetime1 + " and register_inspection.date_time <= " + datetime2 + " and register_inspection.inspection_category = inspection.id then register_inspection.inspection_category else 0 end)"), 'count']
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name', 'id'], where: queryx},
            ],
            where: query,
            raw: true,
            group: ['inspection_category'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
    };
    InspectionSverka = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        const model = await Register_inspectionModel.findAll({
            attributes: [
                'doc_type', 'id', 'date_time', "doc_id","comment","inspection_id","place",
                [sequelize.literal("`registration->patient`.fullname"), "patient_name"],
            //    [sequelize.literal("SUM(CASE WHEN register_inspection.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'kirim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'Chiqim' THEN register_inspection.price ELSE 0 END)"), 'Chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time <= " + datetime2 + " THEN register_inspection.price * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            include: [
                {
                    model: inspectionModel,
                    as: 'inspec',
                    attributes: ['name', 'id']
                },
                {
                    model: RegistrationModel,
                    as: 'registration',
                    required: false,
                    include: [
                        {
                            model: PatientModel,
                            as: "patient",
                            required: false
                        }
                    ]
                }
            ],
           group: ['id'],
           where: queryx,
           order: [
            ['id', 'DESC']
           ]
        })
        res.send(model)
       }
    //    kassaSverka = async (req, res, next) => {
    //     let result, results;
    //     let body = req.body; 
    //     let query = {}, query_begin = {}, query_end = {}, queryx = {};
    //     query_begin.date_time =  {
    //         [Op.lt]: body.datetime1,
    //     };
    //     query_end.date_time =  {
    //         [Op.lte]: body.datetime2,
    //     };
    //     let datetime1 = body.datetime1,
    //     datetime2 = body.datetime2
    //     query.date_time = {
    //         [Op.gte]: datetime1,
    //         [Op.lte]: datetime2
    //     }
    //     if(body.user_id != null){
    //         query.user_id = {[Op.eq]: body.user_id},
    //         query.filial_id = {[Op.eq]: body.filial_id}
    //     }
    //     else{
    //         query.filial_id = {[Op.eq]: body.filial_id}
    //     }
    //     result = await Register_kassaModel.findAll({
    //         attributes: [ 'doc_type','pay_type', 'id', 'date_time', "doctor_id","place", `price`,
    //             [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` < " + datetime1 + " THEN `register_kassa`.`price` * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
    //             [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Kirim' and `register_kassa`.`pay_type` = 'Naqt' THEN `register_kassa`.`price` ELSE 0 END)"), 'kirim_naqt'],
    //             [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Kirim' and `register_kassa`.`pay_type` = 'Plastik' THEN `register_kassa`.`price` ELSE 0 END)"), 'kirim_plastik'],
    //             [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Chiqim' and `register_kassa`.`pay_type` = 'Plastik' THEN `register_kassa`.`price` ELSE 0 END)"), 'Chiqim_plastik'],
    //             [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` >= " + datetime1 + " and `register_kassa`.`date_time` <= " + datetime2 + " AND `register_kassa`.`doc_type` = 'Chiqim' and `register_kassa`.`pay_type` = 'Naqt' THEN `register_kassa`.`price` ELSE 0 END)"), 'Chiqim_naqt'],
    //             [sequelize.literal("SUM(CASE WHEN `register_kassa`.`date_time` <= " + datetime2 + " THEN `price` * power(-1, 'type') ELSE 0 END)"), 'end_total'],
    //         ],
    //         include:[
    //           {model: RegistrationModel, as: 'registration', attributes: ['id'],
    //           include:[
    //             {model: PatientModel, as: 'patient', attributes: ['fullname']}
    //           ]
    //       }
    //       ],
    //       where: query,
    //       order:[
    //         ['id', 'DESC']
    //       ],
    //       group: ['id']
    //   })
    //   res.send(result);
    // }
    kassaSverka = async (req, res, next) => {
        let result, results;
        let body = req.body; 
        let query = {}, query_begin = {}, query_end = {}, queryx = {};
        query_begin.date_time =  {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time =  {
            [Op.lte]: body.datetime2,
        };
        let datetime1 = body.datetime1,
        datetime2 = body.datetime2
        query.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        result = await Register_kassaModel.findAll({
            attributes: [ 'doc_type','pay_type', 'id', 'date_time', "doctor_id","place", "price", "comment",
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime1 + " THEN register_kassa.price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'Kirim' and register_kassa.pay_type = 'Naqt' THEN register_kassa.price ELSE 0 END)"), 'kirim_naqt'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'Kirim' and register_kassa.pay_type = 'Click' THEN register_kassa.price ELSE 0 END)"), 'klik'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'Kirim' and register_kassa.pay_type = 'Plastik' THEN register_kassa.price ELSE 0 END)"), 'kirim_plastik'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'Chiqim' and register_kassa.pay_type = 'Plastik' THEN register_kassa.price ELSE 0 END)"), 'Chiqim_plastik'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'Chiqim' and register_kassa.pay_type = 'Naqt' THEN register_kassa.price ELSE 0 END)"), 'Chiqim_naqt'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            include:[
              {model: RegistrationModel, as: 'registration', attributes: ['id'],
              include:[
                {model: PatientModel, as: 'patient', attributes: ['fullname']}
              ]
          }
          ],
          where: query,
          order:[
            ['id', 'DESC']
          ],
          group: ['id']
        })
        const begin = await Register_kassaModel.findOne({
            attributes: [
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime1 + " AND pay_type = 'Naqt' AND doc_type = 'Kirim' THEN register_kassa.price  WHEN register_kassa.date_time < " + datetime1 + " AND pay_type = 'Naqt' AND doc_type = 'Chiqim' THEN -register_kassa.price  ELSE 0 END)"), 'end_total_naqt'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime1 + " AND pay_type = 'Click' AND doc_type = 'Kirim' THEN register_kassa.price  WHEN register_kassa.date_time < " + datetime1 + " AND pay_type = 'Click' AND doc_type = 'Chiqim' THEN -register_kassa.price  ELSE 0 END)"), 'end_total_clik'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime1 + " AND pay_type = 'Plastik' AND doc_type = 'Kirim' THEN register_kassa.price  WHEN register_kassa.date_time < " + datetime1 + " AND pay_type = 'Plastik' AND doc_type = 'Chiqim' THEN -register_kassa.price  ELSE 0 END)"), 'end_total_plastik'],
            ]
        })
        const end = await Register_kassaModel.findOne({
            attributes: [
            [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime2 + " AND pay_type = 'Naqt' AND doc_type = 'Kirim' THEN register_kassa.price  WHEN register_kassa.date_time < " + datetime2 + " AND pay_type = 'Naqt' AND doc_type = 'Chiqim' THEN -register_kassa.price  ELSE 0 END)"), 'end_total_naqt'],
            [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime2 + " AND pay_type = 'Click' AND doc_type = 'Kirim' THEN register_kassa.price  WHEN register_kassa.date_time < " + datetime2 + " AND pay_type = 'Click' AND doc_type = 'Chiqim'  THEN -register_kassa.price  ELSE 0 END)"), 'end_total_clik'],
            [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime2 + " AND pay_type = 'Plastik' AND doc_type = 'Kirim' THEN register_kassa.price  WHEN register_kassa.date_time < " + datetime2 + " AND pay_type = 'Plastik' AND doc_type = 'Chiqim' THEN -register_kassa.price  ELSE 0 END)"), 'end_total_plastik'],
        ]
    })

    res.send({
        begin: begin,
        items: result,
        end: end
    });
    }
    // palata = async (req, res, next) => {
    //     let query = {}, query_begin = {}, query_end = {}, body = req.body;
    //     let data1 = body.date_to;
    //     let data2 = body.date_do;
    //     query.date_time = {
    //         [Op.gte]: body.date_to,
    //         [Op.lte]: body.date_do,
    //     }
    //     query_begin.date_time = {
    //         [Op.lt]: body.date_to
    //     }
    //     query_end.date_time = {
    //         [Op.lte]: body.date_do
    //     }

    //     let result = await palataModel.findAll({
    //             include:[
    //                 {model: registration_palataModel, as: 'palatas', attributes: ['id','date_time', 'date_do', 'palata_id'],
    //             }
    //             ],
    //             // raw: true
    //            })
    //     result.forEach(value => {
    //        if(value.dataValues.palatas.length > 0){
    //         value.dataValues.palatas.forEach(el => {
    //             if(el.dataValues.date_do >= data1 &&
    //                 el.dataValues.date_do >= data2
    //                 ){
    //                     value.dataValues.status = true;
    //                 }
    //                 else if(el.dataValues.date_do >= data1 && el.dataValues.date_time <= data2){
    //                     value.dataValues.status = true;
    //                 }
    //                 else if(el.dataValues.date_do <= data1 && el.dataValues.date_time <= data2){
    //                     value.dataValues.status = false;
    //                 }
    //                 else{
    //                     value.dataValues.status = false;
    //                 }
    //                 // console.log("if4", value.dataValues);
    //             })
    //        }
    //        else{
    //         value.dataValues.status = false;
    //        }
            
    //     })
    //     res.send(result);
    // }
    Statsionar = async(req, res, next) => {
        const { datetime1, datetime2 } = req.body;
        const query = {
            date_time: {
                [Op.gte]: datetime1,
                [Op.lte]: datetime2,
            }
        }
        const results = await RegisterPalataModel.findAll({
            attributes: [
                'id', 'palata_id', 'vazvrat', 'registration_id', 'patient_id', 'date_time',
                [sequelize.literal('registration.pay_summa'), 'pay_summa'],
                [sequelize.literal('registration.hospital_summa'), 'hospital_summa'],
                [sequelize.literal('registration.summa'), 'summa']
            ],
            include: [
                {
                    model: RegistrationModel,
                    as: 'registration',
                    required: false
                },
                {
                    model: PatientModel,
                    as: 'patient',
                    required: false,
                },
                {
                    model: palataModel,
                    as: 'palata',
                    required: false,
                    include: [
                        {
                            model: xona_etajModel,
                            as: 'xona',
                            required: false,
                            include: [
                                {
                                    model: palata_categoryModel,
                                    as: 'palata_category',
                                    required: false
                                }
                            ]
                        }
                    ]
                }
            ],
            group: ['registration_id', 'palata_id'],
            where: query
        })
        res.send(results)

    }
    doctorHisobot = async (req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.doctor_id !== null){
            queryx.id = {[Op.eq] : body.doctor_id }  
            query.doctor_id = {[Op.eq]: body.doctor_id}
        };
        const results = await register_doctorModel.findAll({
            attributes: [
                'id', "type", "date_time", "doc_id","comment", "place", "pay_type", "summa_type",
                [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " AND doc_type = 'kirim' THEN `price` WHEN  date_time < " + datetime1 + " AND doc_type = 'Chiqim' THEN -`price` ELSE 0 END)"), 'begin_total'],
                [sequelize.literal("SUM(CASE WHEN date_time >=" + datetime1 + " AND date_time <= " + datetime2 + " AND doc_type = 'Chiqim' THEN `price` ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("SUM(CASE WHEN date_time >=" + datetime1 + " AND date_time <= " + datetime2 + " AND doc_type = 'kirim' AND pay_type = 'Naqt' THEN `summa_type` ELSE 0 END)"), 'total_naqt'],
                [sequelize.literal("SUM(CASE WHEN date_time >=" + datetime1 + " AND date_time <= " + datetime2 + " AND doc_type = 'kirim' AND pay_type = 'Plastik' THEN `summa_type` ELSE 0 END)"), 'total_Plastik'],
                [sequelize.literal("SUM(CASE WHEN date_time >=" + datetime1 + " AND date_time <= " + datetime2 + " AND doc_type = 'kirim' AND pay_type = 'Click' THEN `summa_type` ELSE 0 END)"), 'total_Click'],
                [sequelize.literal("SUM(CASE WHEN date_time >=" + datetime1 + " AND  date_time <= " + datetime2 + " AND doc_type = 'kirim' THEN `price` ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN date_time <=" + datetime2 + " AND doc_type = 'kirim' THEN `price` WHEN  date_time <= " + datetime2 + " AND doc_type = 'Chiqim' THEN -`price` ELSE 0 END)"), 'end_total'],
            ],
            include: [
                { model: DoctorModel, as: 'doctor', attributes: ['name', 'id']},
            ],
            group: ['doctor_id'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(results);
    };
     
    TekshiruvSoni = async(req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }  
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
        };
        const model = await Register_inspectionModel.findAll({
            attributes:[
                [sequelize.fn("COUNT", sequelize.col("registration.patient_id")), "count"]
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name'], where: query},
                { model: RegistrationModel, as: 'registration', attributes: ['patient_id']}
            ],
            where: {
                inspection_category: {[Op.eq]: body.inspection_category},
                date_time: {
                    [Op.gte]: datetime1,
                    [Op.lte]: datetime2
                }
            }
        })
        res.send(model)
    }
    surgeryCategorySverka = async(req, res, next) => {
        const { datetime1, datetime2, category_id } = req.body;
        let query;
        query = {
            date_time: {
                [Op.gte]: datetime1,
                [Op.lte]: datetime2,
            }
        }
        if(category_id) {
            query.category_id = category_id
        }
        const result = await surgery_category_register.findAll({
            include: [
                {
                    model: surgeryCategoryModel,
                    as: 'category',
                    required: false
                },
                {
                    model: DoctorModel,
                    as: 'doctor',
                    required: false
                }
            ],
            where: query
        })
        const all = await surgery_category_register.findOne({
            attributes: [
                [sequelize.literal('SUM(`price`)'), 'total_price'],
                [sequelize.literal('SUM(`all_price`)'), 'total_all_price'],
            ],
            where: query
        })
        res.send({
            items: result,
            all: all
        })
    }
    surgeryCategoryHisobot = async(req, res, next) => {
        const { datetime1, datetime2, category_id } = req.body;
        let query;
        query = {
            date_time: {
                [Op.gte]: datetime1,
                [Op.lte]: datetime2,
            }
        }
        if(category_id) {
            query.category_id = category_id
        }
        const result = await surgery_category_register.findAll({
            attributes: [
                [sequelize.literal('COUNT(`register_surgery_category`.`id`)'), 'count'],
                [sequelize.literal('SUM(`register_surgery_category`.`price`)'), 'total_price'],
                [sequelize.literal('SUM(`register_surgery_category`.`all_price`)'), 'total_all_price'],
            ],
            include: [
                {
                    model: surgeryCategoryModel,
                    as: 'category',
                    required: false
                }
            ],
            group: ['category_id'],
            where: query
        })
        const all = await surgery_category_register.findOne({
            attributes: [
                [sequelize.literal('COUNT(`id`)'), 'total_count'],
                [sequelize.literal('SUM(`price`)'), 'total_price'],
                [sequelize.literal('SUM(`all_price`)'), 'total_all_price'],
            ],
            where: query,
        })
        res.send({
            items: result,
            all: all
        })
    }
    surgeryHisobot = async (req, res, next) => {
        const { datetime1, datetime2, surgery_id } = req.body;
        let query = {
            date_time: {
                [Op.gte]: datetime1,
                [Op.lte]: datetime2,
            }
        }
        if(surgery_id) {
            query.surgery_id = surgery_id
        }
    
        const results= await register_surgeryModel.findAll({
            attributes: [
                'id', 'date_time','vazvrat', 'doc_id', 'surgery_id', 'doc_type', 'place',
                [sequelize.literal('SUM(`register_surgery`.`price`)'), 'all_price'],
                [sequelize.literal('SUM(`register_surgery`.`surgery_price`)'), 'all_surgery_price'],
                [sequelize.literal('COUNT(`register_surgery`.`id`)'), 'count'],
            ],
            include: [
                {
                    model: surgerygModel,
                    as: 'surgery',
                    required: false,
                    include: [
                        {
                            model: DoctorModel,
                            as: 'doctor',
                            required: false
                        }
                    ]
                }
            ],
            group: ['id'],
            where: query
        })
        res.send(results);
    }
    LabarantHisobot = async (req, res, next) => {
    const { datetime1, datetime2, user_id } = req.body;
    let query = {
        date_time: {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2,
        },
        place: 'Registration'
    }
    let queryx = {};
    queryx.role = 'Loborant';
    let queryAll = {};
    if (user_id) {
        queryAll = {
            user_id: user_id
        }
        query.user_id = user_id
    } 
    // else {
    //     queryAll = {
    //         user_id: {
    //             [Op.in]: sequelize.literal(
    //                 `(SELECT id FROM user WHERE role = 'Loborant')`
    //             ),
    //         }
    //     }
    //     query.user_id = {
    //         [Op.in]: sequelize.literal(
    //             `(SELECT id FROM user WHERE role = 'Loborant')`
    //         ),
    //     }
    // }
    const items = await Register_inspectionModel.findAll({
        attributes: [
            [sequelize.literal("COUNT(DISTINCT(doc_id))"), "count"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' AND `register_inspection`.`pay_type` = 'Naqt' THEN `summa_type` ELSE 0 END)"), "naqt"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' AND `register_inspection`.`pay_type` = 'Plastik' THEN `summa_type` ELSE 0 END)"), "plastik"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' AND `register_inspection`.`pay_type` = 'Click' THEN `summa_type` ELSE 0 END)"), "click"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' THEN `summa_type` ELSE 0 END)"), "all_price"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' THEN `doctor_price` ELSE 0 END)"), "doctor_price"],
        ],
        include: [
            {
                attributes: ['id', 'user_name'],
                model: UserModel,
                as: 'user',
                required: false
            }
        ],
        group: ['user_id'],
        where: query
    })

    const all = await Register_inspectionModel.findOne({
        attributes: [
            [sequelize.literal("COUNT(DISTINCT(CASE WHEN `place` = 'Registration' THEN `doc_id` END))"), "count"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' AND `register_inspection`.`pay_type` = 'Naqt' THEN `summa_type` ELSE 0 END)"), "naqt"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' AND`register_inspection`.`pay_type` = 'Plastik' THEN `summa_type` ELSE 0 END)"), "plastik"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' AND `register_inspection`.`pay_type` = 'Click' THEN `summa_type` ELSE 0 END)"), "click"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' THEN `summa_type` ELSE 0 END)"), "all_price"],
            [sequelize.literal("SUM(CASE WHEN `place` = 'Registration' THEN `doctor_price` ELSE 0 END)"), "doctor_price"],
        ],
        where: query
    })
        // const result = await registerUserModel.findAll({
        //     attributes: [
        //         [sequelize.literal("SUM(CASE WHEN doc_type = 'kirim' THEN `price` WHEN doc_type = 'Chiqim' THEN -`price` ELSE 0 END)"), 'price'],
        //     ],
        //     include: [
        //         {
        //             model: UserModel,
        //             as: 'user',
        //             required: false,
        //             where: queryx,
        //             attributes: ['id', 'user_name', 'role']
        //         }
        //     ],
        //     group: ['user_id'],
        //     where: query
        // })

        res.send({
            items: items,
            all: all
        })
    }
   LabarantSverka = async (req, res, next) => {
    const { datetime1, datetime2, user_id } = req.body;
    let query = {
        date_time: {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2,
        }
    }
    let queryx = {};
    queryx.role = 'Loborant';
    let queryAll = {};
    if (user_id) {
        queryAll = {
            user_id: user_id
        }
        query.user_id = user_id
    } 
    // else {
    //     queryAll = {
    //         user_id: {
    //             [Op.in]: sequelize.literal(
    //                 `(SELECT id FROM user WHERE role = 'Loborant')`
    //             ),
    //         }
    //     }
    //     query.user_id = {
    //         [Op.in]: sequelize.literal(
    //             `(SELECT id FROM user WHERE role = 'Loborant')`
    //         ),
    //     }
    // }
    const begin = await registerUserModel.findOne({
        attributes: [
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <= " + datetime1 + " THEN `price` WHEN `doc_type` = 'Chiqim' AND `date_time` <= " + datetime1 + " THEN -`price` ELSE 0 END)"), 'begin_price'],
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <="+ datetime1 +" THEN `price` ELSE 0 END)"), 'begin_kirim_price'],
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'Chiqim' AND `date_time` <="+ datetime1 +" THEN `price` ELSE 0 END)"), 'begin_Chiqim_price'],
        ],
        where: queryAll,
    })
    const result = await registerUserModel.findAll({
        include: [
            {
                model: UserModel,
                as: 'user',
                attributes: ['id', 'user_name', 'role'],
                required: false,
                where: queryx
            }
        ],
        where: query
    })
    const end = await registerUserModel.findOne({
        attributes: [
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <= " + datetime2 + " THEN `price` WHEN `doc_type` = 'Chiqim' AND `date_time` <= " + datetime2 + " THEN -`price` ELSE 0 END)"), 'end_price'],
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <="+ datetime2 +" AND `date_time` >= " + datetime1 + " THEN `price` ELSE 0 END)"), 'end_kirim_price'],
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'Chiqim' AND `date_time` <="+ datetime2 +" AND `date_time` >= " + datetime1 + " THEN `price` ELSE 0 END)"), 'end_chiqim_price'],
        ],
        where: queryAll
    })
    res.send({
        begin: begin,
        items: result,
        end: end
    })
   }
   surgerySverka = async (req, res, next) => {
    const { datetime1, datetime2, surgery_id } = req.body;
    let query = {
        date_time: {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2,
        }
    }
    if(surgery_id) {
        query.surgery_id = surgery_id
    }

    const results= await register_surgeryModel.findAll({
        attributes: [
            'id', 'date_time','vazvrat', 'doc_id', 'surgery_id', 'surgery_price', 'doc_type', 'price', 'place',
        ],
        include: [
            {
                model: surgerygModel,
                as: 'surgery',
                required: false,
                include: [
                    {
                        model: DoctorModel,
                        as: 'doctor',
                        required: false
                    }
                ]
            },
            {
                model: RegistrationModel,
                as: 'registration',
                required: false,
                include: [
                    {
                        model: PatientModel,
                        as: 'patient',
                        required: false
                    }
                ]
            }
        ],
        group: ['id'],
        where: query
    })
    res.send(results);
   }
   palataSverka = async (req, res, next) => {
    const { palata_id, category_id, room_id } = req.body;
    const body = req.body;
    let query = {};
    query = {
        date_to: {
            [Op.gte]: body.date_to,
        },
        date_do: {
            [Op.lte]: body.date_do
        }
    }
    if(palata_id) {
        query.palata_id = palata_id
    }
    if(category_id) {
        query.category_id = category_id
    }
    if(room_id) {
        query.room_id = room_id;
    }
    const result = await register_palataModel.findAll({
        attributes: [
            'registration_id',
            [sequelize.literal('GROUP_CONCAT(DISTINCT `palata`.`id`)'), 'palataids'],
            [sequelize.literal('GROUP_CONCAT(`palata`.`id`)'), 'palata_counts'],
            [sequelize.literal('SUM(`register_palata`.`price`)'), 'all_price'],
            [sequelize.literal('SUM(`doctor_price`)'), 'all_doctor_price']
        ],
        include: [
            {
                model: palataModel,
                as: 'palata',
                attributes: [],
                required: true
            },
            {
                model: PatientModel,
                attributes: ['id', 'fullname'],
                as: 'patient',
                required: false
            },
            {
                model: DoctorModel,
                as: 'doctor',
                required: false
            },
            {
                model: RegistrationModel,
                as: 'registration',
                attributes: ['pay_summa', 'backlog'],
                required: false
            }
        ],
        group: ['registration_id'],
        where: query,
    })
    const formattedResult = [];
    let allSum = 0;
    let allBacklog = 0;
    for (let index = 0; index < result.length; index++) {
        const item = result[index];
        let palatas = [];
        allSum += item.getDataValue('registration').pay_summa
        allBacklog += item.getDataValue('registration').backlog
        const separatedIds = item.getDataValue('palataids').split(',');
        const separatedCounts = item.getDataValue('palata_counts').split(',');
        for (let j = 0; j < separatedIds.length; j++) {
            const pal = await palataModel.findOne({
                where: {
                    id: separatedIds[j]
                }
            })
            const room = await xona_etajModel.findOne({
                where: pal.room_id
            })
            const count = separatedCounts.filter((val) => val == separatedIds[j]).length;
            palatas.push({
                id: Number(separatedIds[j]),
                name: pal.name,
                room_name: room.name,
                count: count,
                price: pal.price,
                summa: pal.price * count
            })
        }
        item['palatas'] = palatas;
        formattedResult.push(item)
    }
    const all = await register_palataModel.findOne({
        attributes: [
            [sequelize.literal('SUM(`price`)'), 'all_palata_summa'],
            [sequelize.literal('SUM(`doctor_price`)'), 'all_doctor_summa']
        ],
        where: query
    })
    all['all_pay_summa'] = allSum;
    res.send({
        items: formattedResult,
        all: all
    })
   }
   palataHisobot = async (req, res, next) => {
    let query = {}, body = req.body;
    let data1 = body.date_to;
    let data2 = body.date_do;
    let { category_id } = req.body;
    query = {
        date_to: {
            [Op.gte]: body.date_to,
        },
        date_do: {
            [Op.lte]: body.date_do
        }
    }
    let catQuery = {};
    if(category_id) {
        catQuery.id = category_id
    }
    let results = await palata_categoryModel.findAll({
        where: catQuery,
        include: [
            {
                model: xona_etajModel,
                as: 'xona',
                required: false,
                include: [
                    {
                        model: palataModel,
                        as: 'palata',
                        required: false,
                        attributes: [
                            'id',
                            'name',
                            'price',
                        ],
                        include:[
                            {
                                model: registration_palataModel,
                                as: 'palatas',
                                attributes: ['id','date_time', 'date_do', 'date_to', 'palata_id', 'total_price', 'comment', 'user_id'],
                                required: false,
                                where: query
                        }]
                    }
                ]
            }
        ]
    })
    for (let ind = 0; ind < results.length; ind++) {
        let el = results[ind];
        el.xona = el.xona.sort((a, b) => {
            if (a.name < b.name) {
                return -1; // a should come before b
              } else if (a.name > b.name) {
                return 1; // b should come before a
              } else {
                return 0; // the order doesn't matter
              }
        })
    }
    for (let ind = 0; ind < results.length; ind++) {
        const el = results[ind];
        for (let ind1= 0; ind1 < el.xona.length; ind1++) {
            const el1 = el.xona[ind1];
            for (let ind2 = 0; ind2 < el1.palata.length; ind2++) {
                let el2 = el1.palata[ind2];
                let tempTotal = 0;
                if (el2.palatas.length > 0) {
                    el2.palatas = el2.palatas.sort((a, b) => {
                        if (a.date_to < b.date_to) {
                            return -1; // a should come before b
                          } else if (a.date_to > b.date_to) {
                            return 1; // b should come before a
                          } else {
                            return 0; // the order doesn't matter
                          }
                    })
                    el2.palatas.forEach((item) => {
                        tempTotal += item.total_price;
                        if(item.date_to >= data1 &&  data2 >= item.date_do) {
                            let differance = data2 - item.date_do;
                            if(differance >= 86400) {
                                el2.status = false
                            } else {
                                el2.status = true
                            }
                        } else {
                            el2.status = false
                        }
                    })
                    el2.comment = el2.palatas[0].comment;
                    el2.user_id = el2.palatas[0].user_id;

                } else {
                    el2.status = false;
                }
                
                el2.total_price = tempTotal;
            }
        }
    }
    res.send(results);
   }

   palataByDoctorHisobot = async (req, res, next) => {
    const { datetime1, datetime2, doctor_id } = req.body;
    let query = {};
    query.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2,
    }
    // query.vazvrat = false;
    if(doctor_id) {
        query.doctor_id = doctor_id;
    }

    let result = await RegisterPalataModel.findAll({
        attributes: [
            'date_time',
            'doctor_id',
            [sequelize.literal('COUNT(DISTINCT `patient_id`)'), 'count'],
            [sequelize.literal("SUM(CASE WHEN `pay_type` = 'Plastik' THEN `summa_type` ELSE 0 END)"), 'plastik'],
            [sequelize.literal("SUM(CASE WHEN `pay_type` = 'Naqt' THEN `summa_type` ELSE 0 END)"), 'naqt'],
            [sequelize.literal("SUM(CASE WHEN `pay_type` = 'Click' THEN `summa_type` ELSE 0 END)"), 'click'],
            [sequelize.literal("SUM(`summa_type`)"), 'all_summa'],
            [sequelize.literal("SUM(`doctor_price`)"), 'doctor_price']
        ],
        include: [
            {
                model: DoctorModel,
                as: 'doctor',
                required: false
            }
        ],
        where: query,
        group: ['doctor_id'],
    })

    res.send(result)
    }

   surgeryByDoctorHisobot = async (req, res, next) => {
    const result = await this.getSurgeryReport(req, ['doctor_id'], 
    [
        {
            model: DoctorModel,
            as: 'doctor',
            required: false,

        }
    ]);
    res.send(result)
   }
   getSurgeryReport = async (req, group, include) => {
    const { datetime1, datetime2, doctor_id } = req.body;
    let query = {};
    query.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2,
    }
    query.vazvrat = false;
    if(doctor_id) {
        query.doctor_id = doctor_id;
    }
    let result = await SurgeryRegistration.findAll({
        attributes:[
            'date_time',
            'doctor_id',
            [sequelize.literal("COUNT(DISTINCT `patient_id`)"), 'patient_count'],
            [sequelize.literal("COUNT(`surgery_id`)"), 'surgery_count'],
            [sequelize.literal("SUM(`doctor_summa`)"), 'total_doctor_summa'],
            [sequelize.literal("SUM(`surgery_registration`.`price`)"), 'total_price'],
        ],
        include: include,
        where: query,
        group: group
    })
    return result;
   }

   EachSurgeryByDoctorHisobotEach = async (req, res, next) => {
    let result = await this.getSurgeryReport(req, ['doctor_id', 'surgery_id'],
    [
        {
            model: DoctorModel,
            as: 'doctor',
            required: false,

        },
        {
            model: surgerygModel,
            as: 'surgery',
            required: false
        }
    ]);
    res.send(result)
   }
   SurgeryByDoctorSverka = async (req, res, next) => {
    const { datetime1, datetime2, doctor_id, surgery_id } = req.body;
    let query = {};
    query.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2,
    }
    query.vazvrat = false;
    if(doctor_id) {
        query.doctor_id = doctor_id;
    }
    if(surgery_id) {
        query.surgery_id = surgery_id;
    }

    let result = await SurgeryRegistration.findAll({
        attributes: [
            'registration_id',
            'date_time',
            'doctor_id',
            'doctor_summa',
            'price',
        ],
        include: [
            {
                model: DoctorModel,
                as: 'doctor',
                required: false,
    
            },
            {
                model: surgerygModel,
                as: 'surgery',
                required: false
            }
        ],
        where: query
    })
    
    res.send(result);
   }
   palataByDoctorSverka = async (req, res, next) => {
    const { datetime1, datetime2, doctor_id } = req.body;
    let query = {};
    query.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2,
    }
    query.vazvrat = false;
    if(doctor_id) {
        query.user_id = doctor_id;
    }
    let result = await registration_palataModel.findAll({
        attributes:[
            'date_time',
            'user_id',
            'registration_id',
            [sequelize.literal("COUNT(`patient_id`)"), 'day_count'],
            [sequelize.literal("SUM(`total_price`)"), 'total_price'],
        ],
        include: [
            {
                model: DoctorModel,
                as: 'doctor',
                required: false
            },
            {
                model: PatientModel,
                attributes: ['id', 'fullname'],
                as: 'patient',
                required: false
            }
        ],
        where: query,
        group: ['user_id', 'registration_id']
    })
    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let doctor = await UserModel.findOne({
            where: {
                doctor_id: element.user_id
            }
        })
        let percent = doctor.palata_percent;
        if(!percent) percent = 0;
        element.doctor_summa = (element.getDataValue('total_price') * percent) / 100;
    }
    res.send(result)
   }

   patientHisobot = async (req, res, next) => {
        const { datetime1, datetime2 } = req.body;
        let query = {
            created_at: {
                [Op.gte]: datetime1,
                [Op.lte]: datetime2
            }
        };
        
        const result =  await RegistrationModel.findOne({
            attributes: [
                [sequelize.literal("SUM(CASE WHEN status = 'waiting' THEN 1 ELSE 0 END)"), "progress"],
                [sequelize.literal("SUM(CASE WHEN status = 'complate' THEN 1 ELSE 0 END)"), "completes"],
                [sequelize.literal("SUM(summa)"), "summa"],
            ],
            where: query
        })
        const patients = await RegistrationModel.findAll({
            attributes: ['id', 'status', 'created_at', 'type_service', 'summa'],
            include: [
                {
                    attributes: ['id', 'fullname'],
                    model: PatientModel,
                    as: 'patient',
                    required: false
                }
            ],
            where: query
        })
        res.send({
            result: result,
            items: patients
        })
   }

   DoctorSverka = async (req, res, next) => {
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.doctor_id !== null){
        queryx.id = {[Op.eq] : body.doctor_id }  
        query.doctor_id = {[Op.eq]: body.doctor_id}
    };
    query.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2
    }
    const begin = await register_doctorModel.findOne({
        attributes: [
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <= " + datetime1 + " THEN `price` WHEN `doc_type` = 'Chiqim' AND `date_time` <= " + datetime1 + " THEN -`price` ELSE 0 END)"), 'begin_price'],
        ],
        where: query
    })
    const model = await register_doctorModel.findAll({
        attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place", "pay_type", "summa_type",
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' AND register_doctor.pay_type = 'Naqt' THEN register_doctor.summa_type ELSE 0 END)"), 'naqt'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' AND register_doctor.pay_type = 'Plastik' THEN register_doctor.summa_type ELSE 0 END)"), 'plastik'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' AND register_doctor.pay_type = 'Click' THEN register_doctor.summa_type ELSE 0 END)"), 'clik'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'kirim'],
           [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'Chiqim' THEN register_doctor.price ELSE 0 END)"), 'Chiqim'],
           [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
       ],  
       where: query,
       group: ['doc_id', 'place'],
       order: [
        ['id', 'DESC']
       ]
    })
    const end = await register_doctorModel.findOne({
        attributes: [
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <= " + datetime2 + " THEN `price` WHEN `doc_type` = 'Chiqim' AND `date_time` <= " + datetime2 + " THEN -`price` ELSE 0 END)"), 'end_price'],
            // [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <= " + datetime2 + " AND `date_time` >= "+ datetime1 +" THEN `` ELSE 0 END)"), 'total_naqt'],
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' AND `date_time` <= " + datetime2 + " AND `date_time` >= "+ datetime1 +" THEN `price` ELSE 0 END)"), 'total_kirim_price'],
            [sequelize.literal("SUM(CASE WHEN `doc_type` = 'Chiqim' AND `date_time` <= " + datetime2 + " AND `date_time` >= "+ datetime1 +"  THEN `price`  ELSE 0 END)"), 'total_chiqim_price'],
        ],
        where: query
    })
    res.send({
        begin: begin,
        items: model,
        end: end
    })
   }

   pastavchikSverka = async(req, res, next) => {
    let body = req.body; 
    let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.pastavchik_id !== null){
            query.id = {[Op.eq] : body.pastavchik_id }  
            queryx.pastavchik_id = {[Op.eq]: body.pastavchik_id}
            
        };
        queryx.date_time = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
    let model = await register_supplierModel.findAll({
        attributes : [ 
            'id', 'pastavchik_id', "type", "date_time", "doc_type", "summa", "doc_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'Chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
        where: queryx,
        group: ['id'],
        order: [
            ['id', 'DESC']
           ]
    })
    res.send(model)
 } 
 pastavchikHisobot = async(req, res, next) => {
    let body = req.body; 
    let query = {}, queryx = {};
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.pastavchik_id !== null){
            query.id = {[Op.eq] : body.pastavchik_id }  
            queryx.pastavchik_id = {[Op.eq]: body.pastavchik_id}
            
        };
    let model = await register_supplierModel.findAll({
        attributes : [ 
            'id', 'doc_id', "type", "date_time", "doc_type", "summa", "pastavchik_id", "place",
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime1 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'total'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'kirim' THEN register_supplier.summa ELSE 0 END)"), 'total_kirim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time >= " + datetime1 + " and register_supplier.date_time <= " + datetime2 + " AND register_supplier.doc_type = 'Chiqim' THEN register_supplier.summa ELSE 0 END)"), 'total_chiqim'],
            [sequelize.literal("SUM(CASE WHEN register_supplier.date_time < " + datetime2 + " THEN register_supplier.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
        include:[
            {model: pastavchikModel, as: 'pastavchik'}
        ],
        where: queryx,
        group: ['pastavchik_id']
    })
    res.send(model)
 } 
 ReagentHisobot = async(req, res, next) => {
    let query = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;

    if(body.reagent_id){
        query.reagent_id = {
            [Op.eq] : body.reagent_id 
        }  
    };

    try {

        const items = await  register_reagentModel.findAll({
            attributes: [
                [sequelize.literal("SUM(CASE WHEN `date_time` <= " + datetime1 + " THEN power(-1, `type` + 1) * `count` ELSE 0 END)"), "begin_count"],
                [sequelize.literal("SUM(CASE WHEN `date_time` <= " + datetime1 + " THEN power(-1, `type` + 1) * `summa` ELSE 0 END)"), "begin_summa"],
                [sequelize.literal("SUM(CASE WHEN `date_time` > " + datetime1 + " AND `date_time` <= " + datetime2 + " AND `type` = 1 THEN `count` ELSE 0 END)"), "total_debit_count"],
                [sequelize.literal("SUM(CASE WHEN `date_time` > " + datetime1 + " AND `date_time` <= " + datetime2 + " AND `type` = 1 THEN `summa` ELSE 0 END)"), "total_debit_summa"],
                [sequelize.literal("SUM(CASE WHEN `date_time` > " + datetime1 + " AND `date_time` <= " + datetime2 + " AND `type` = 0 THEN `count` ELSE 0 END)"), "total_credit_count"],
                [sequelize.literal("SUM(CASE WHEN `date_time` > " + datetime1 + " AND `date_time` <= " + datetime2 + " AND `type` = 0 THEN `summa` ELSE 0 END)"), "total_credit_summa"],
                [sequelize.literal("SUM(CASE WHEN `date_time` <= " + datetime2 + " THEN power(-1, `type` + 1) * `count` ELSE 0 END)"), "end_count"],
                [sequelize.literal("SUM(CASE WHEN `date_time` <= " + datetime2 + " THEN power(-1, `type` + 1) * `summa` ELSE 0 END)"), "end_summa"],
            ],
            include: [
                {
                    model: reagentModel,
                    as: 'reagent',
                    required: false
                }
            ],
            group: ['reagent_id'],
            where: query
        })

        res.send({
            items: items,
        })
    } catch (error) {
        console.log("ERROR STACK", error)
        throw new HttpException(500, "Error")
    }
   
}
ReagentSverka = async(req, res, next) => {
    let query = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;

    if(body.reagent_id){
        query.reagent_id = {[Op.eq] : body.reagent_id }  
    };
    try {
        const begin = await register_reagentModel.findOne({
            attributes: [
                [sequelize.literal("SUM(CASE WHEN  `date_time` <= " + datetime1 + " THEN power(-1, `type` + 1) * `count` ELSE 0 END)"), "begin_count"],
                [sequelize.literal("SUM(CASE WHEN  `date_time` <= " + datetime1 + " THEN power(-1, `type` + 1) * `summa` ELSE 0 END)"), "begin_summa"],
            ],
            where: query
        })
        
        const items = await  register_reagentModel.findAll({
            include: [
                {
                    model: reagentModel,
                    as: 'reagent',
                    required: false
                }
            ],
            where: query
        })
        const end = await register_reagentModel.findOne({
            attributes: [
                [sequelize.literal("SUM(CASE WHEN  `date_time` <= " + datetime2 + " THEN power(-1, `type` + 1) * `count` ELSE 0 END)"), "end_count"],
                [sequelize.literal("SUM(CASE WHEN  `date_time` <= " + datetime2 + " THEN power(-1, `type` + 1) * `summa` ELSE 0 END)"), "end_summa"],
            ],
            where: query
        })
        res.send({
            begin: begin,
            items: items,
            end: end
        })
    } catch (error) {
        console.log("ERROR STACK", error.stack)
        throw new HttpException(500, "Error")
    }
   
}
Sverka = async(req, res, next) => {
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.reagent_id !== null){
        query.id = {[Op.eq] : body.reagent_id }  
        queryx.reagent_id = {[Op.eq]: body.reagent_id}
    };
    queryx.date_time = {
        [Op.gte]: datetime1,
        [Op.lte]: datetime2
    }
    let model  = await register_reagentModel.findAll({
        attributes: [
            'id', "price", "date_time", "doc_id","count", "summa", "reagent_id", "doc_type",
            [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
           [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'kirim' THEN register_reagent.summa ELSE 0 END)`), 'total_kirim'],
           [sequelize.literal("SUM(CASE WHEN register_reagent.date_time >= " + datetime1 + " and register_reagent.date_time <= " + datetime2 + ` AND register_reagent.doc_type = 'Chiqim' THEN register_reagent.summa ELSE 0 END)`), 'total_chiqim'],
           [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN summa * power(-1, 'type') ELSE 0 END)"), 'end_total']
       ],
       include:[
        {model: reagentDepartmentModel, as: 'reagent_department',
    include:[
        {model: reagentModel, as: 'reagent'},
        {model: doctorCategory, as:'department'}
    ]
    },
    {model: reagentModel, as: 'reagent'}
     ],
       where: queryx,
       group: ['id'],
       order: [
        ['id', 'DESC']
       ]
    })
    res.send(model)
}
}


module.exports = new HisobotController;