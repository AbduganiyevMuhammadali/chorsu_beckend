const ModelModel = require('../../models/registration.model');
const arxiv = require('../../models/registration_arxiv.model');
const HttpException = require('../../utils/HttpException.utils');
const Register_kassaModel = require('../../models/register_kassa.model');
// const inspectionCategory = require('../../models/inspector_category.model');
const { sequelize, sum } = require('../../models/user.model');
const { validationResult } = require('express-validator');
const registration_palataModel = require('../../models/registration_palata.model');
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child.model');
const Registration_doctorModel = require('../../models/registration_doctor.model');
const RegistrationDoctorCategoryModel = require('../../models/reg_doctor_category.model');
const Registration_recipeModel = require('../../models/registration_recipe.model');
const Registration_filesModel = require('../../models/registration_files.model');
const Register_mkb = require('../../models/register_mkb.model');
const surgerygModel = require('../../models/surgery')
const register_palataModel = require('../../models/register_palata.model');
const register_surgerycategoryModel = require('../../models/surgery_category_register');
const Register_inspectionModel = require('../../models/register_inspection.model');
const InspectionReagentRegister = require('../../models/register_inspection_reagent.model');
const register_reagentModel = require('../../models/register_reagent.model');
const RegisterDoctorModel = require('../../models/register_doctor.model');
const UserModel = require('../../models/user.model');
const PatientModel = require('../../models/patient.model');
const QueueModel = require('../../models/queue.model');
const RoomModel = require('../../models/room.model');
const DoctorModel = require('../../models/doctor.model');
const DoctorCategory = require('../../models/doctor_category.model');
const InspectionModel = require('../../models/inspection.model');
const {Op, QueryTypes} = require("sequelize");
const reg_doctor_categoryModel = require('../../models/reg_doctor_category.model');
const directModel = require('../../models/direct.model');
const registerDirectModel = require('../../models/register_direct.model');
const registerMedDirectModel = require('../../models/register_med_direct.model');
const palataModel = require('../../models/palata.model');
const PillModel = require('../../models/pill.model');
const Registration_payModel = require('../../models/registration_pay.model');
const registration_palata_arxivModel = require('../../models/registration_palata_arxiv.model');
const Registration_inspection_arxivModel = require('../../models/registration_inspection_arxiv.model');
const Registration_inspection_child_arxxivModel = require('../../models/registration_inspection_child_arxiv.model');
const Registration_pay_arxivModel = require('../../models/registration_pay_arxiv.model');
const Registration_doctor_arxivModel = require('../../models/registration_doctor_arxiv.model');
const Registration_recipe_arxivModel = require('../../models/registration_recipe_arxiv.model');
const Registration_files_arxivModel = require('../../models/registration_files_arxiv.model');
const RegistrationModel = require('../../models/registration.model');
const uplataModel = require('../../models/uplata.model');
const moment = require('moment');
const InspectionReagentCalcModel = require('../../models/inspection_reagent_calc.model');
const register_mkb = require('../../models/register_mkb.model');
const med_directModel = require('../../models/med_direct.model');
const db = require('../../db/db-sequelize');
const inspection_categoryModel = require('../../models/inspector_category.model');
const inspectionModel = require('../../models/inspection.model');
const inspectionChildModel = require('../../models/inspectionChild.model');
const Registration_uziModel = require('../../models/registration_uzi.model');
const Registration_uzi_childModel = require('../../models/registration_uzi_child.model');
const Register_uziModel = require('../../models/register_uzi.model');
const surgery_registrationModel = require('../../models/suergery.register');
const surgery_doctorModel = require('../../models/surgery_doctor');
const surgeryCategoryModel = require('../../models/surgery_category');
const register_doctorModel = require('../../models/register_doctor.model');
const reg_doctor_categoryArxiv = require('../../models/reg_doctor_categoryA.model');
const palata_categoryModel = require('../../models/palata_category.model');
const xona_etajModel = require('../../models/xona_etaj.model');
const register_surgeryModel = require('../../models/register_surgery.model');
const registerUserModel = require('../../models/register_user.model');
const reg_statsionarModel = require('../../models/reg_statsionar.model');
const reg_statsionar_doctorModel = require('../../models/reg_stat_doctor.model');
const reg_stat_doctor_textModal = require('../../models/reg_stat_doctor_text.model');
const bolimModel = require('../../models/bolim.model');
const RegistrationDrugModel = require('../../models/registration_drug.model');
const RegistrationDrugChildModel = require('../../models/registration_drug_child.model');
const RegistrationDrugDaysModel = require('../../models/registration_drug_days.model');
const register_doriModel = require('../../models/register_dori.model');
const docTypes = require('../../utils/docType.utils');
const A4ImagesModel = require('../../models/a4Images.model');


class RegistrationController {
    q = [];

    uploadA4Image = async (req, res, next) => {
        res.send(req.body)
    }

    trancateQueue = async (req, res, next) => {
        await QueueModel.destroy({
            truncate: true,
        })
        res.send("Navbat o'chirildi!")
    }

    getAll = async (req, res, next) => {
            const model = await ModelModel.findAll({
                where:{ 
                    updated_at: {
                        [Op.gte]: req.body.datetime1,
                        [Op.lte]: req.body.datetime2
                    }
                },
            include: [
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: PatientModel, as: 'patient'
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include: [
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        },
                        { model: register_mkb, as: 'register_mkb' }
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                },
                {
                    model: Registration_uziModel, as: 'registration_uzi',
                    include: [
                        {
                            model: Registration_uzi_childModel, as: 'registration_inspection_child'
                        }
                    ]
                },
                {
                    model: surgery_registrationModel, as: 'surgery_registration',
                    include: [
                        {
                            model: surgery_doctorModel,
                            as: 'surgery_doctor'
                        },
                    ]
                },
            ],
            order: [
                ['updated_at', 'desc']
            ],
            // limit: 300
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    getAllReg = async (req, res, next) => {
        try {
            const model = await ModelModel.findAll({
                where:{ 
                    updated_at: {
                        [Op.gte]: req.body.datetime1,
                        [Op.lte]: req.body.datetime2
                    }
                },
            include: [
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: PatientModel, as: 'patient'
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                },
                {
                    model: surgery_registrationModel, as: 'surgery_registration',
                    // include: [
                    //     {
                    //         model: surgery_doctorModel,
                    //         as: 'surgery_doctor'
                    //     },
                    // ]
                },
            ],
            order: [
                ['updated_at', 'desc']
            ],
            limit: 400
            
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
        } catch (error) {
            console.log(error, "registration get all");
        }
}
    getAllRegIns = async (req, res, next) => {
        const model = await Registration_inspectionModel.findAll({
            include: [
                // {
                //     model: UserModel, as: 'user', attributes: ['user_name']
                // },
                {
                    model: inspectionModel, as: 'inspection', attributes: ['name'],
                },
                {
                    model: PatientModel, as: 'patient', attributes: ['fullname', 'id']
                },
            ],
            order: [
                ['id', 'DESC']
            ],
            limit: 500
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    RegInsSearchs = async (req, res, next) => {
        let ModelList = await Registration_inspectionModel.findAll({
            include: [
                {
                    model: PatientModel, as: 'patient', attributes: ['fullname', 'id'],
                    where: {
                        // fullname:{  [Op.like]: '%'+req.body.name+'%'}
                        [Op.or]: [
                            {
                                fullname: { [Op.like]: '%' + req.body.name + '%' }
                            },
                            {
                                id: { [Op.like]: '%' + req.body.name + '%' }
                            }
                        ]
                    }
                },
                {
                    model: inspectionModel, as: 'inspection', attributes: ['name'],
                },
            ],
            limit: 100
        });

        if (req.body.name.length == 0) {
            const model = await Registration_inspectionModel.findAll({
                include: [
                    // {
                    //     model: UserModel, as: 'user', attributes: ['user_name']
                    // },
                    {
                        model: inspectionModel, as: 'inspection', attributes: ['name'],
                    },
                    {
                        model: PatientModel, as: 'patient', attributes: ['fullname', 'id']
                    },
                ],
                order: [
                    ['id', 'ASC']
                ],
                limit: 200
            });
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: model
            });
        }
        else {
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: ModelList
            });
        }

    };
    getOne = async (req, res, next) => {
        const Prixod = await ModelModel.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include: [
                        {
                            model: A4ImagesModel,
                            as: 'a4_images',
                            required: false
                        },
                        { model: inspection_categoryModel, 
                            as: 'category', 
                            attributes: ['name'],
                        },
                        {
                            model: inspectionModel, as: 'inspection', attributes: ['name'],
                            include: [
                                { model: UserModel, as: 'User', attributes: ['user_name'] }
                            ]
                        },
                        {
                            model: Registration_inspection_childModel, 
                            as: 'registration_inspection_child',
                            order: [
                                ['id', 'desc']
                            ]
                        }
                    ],
                    order: [
                        ['id', 'asc']
                    ]
                },
                {
                    model: reg_statsionarModel, as: 'reg_statsionar',
                    include: [
                        {
                            model: reg_statsionar_doctorModel, as: 'reg_statsionar_doctor',
                            include: [
                                {
                                    model: DoctorModel,
                                    as: 'doctor'
                                },
                                {
                                    model: reg_stat_doctor_textModal, as: 'reg_stat_doctor_text',
                                }
                            ] 
                        }
                    ]
                },
                {
                    model: RegistrationDrugModel, as: 'registration_drug',
                    include: [
                        {
                            model: RegistrationDrugChildModel, as: 'registration_drug_child',
                        },
                        {
                            model: RegistrationDrugDaysModel, as: 'registration_drug_days',
                        }
                    ],
                },
                {
                    model: registration_palataModel, as: 'registration_palata',
                    include: [
                        {
                            model: palataModel,
                            as: 'palatas',
                            attributes: ['name'],
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
                    ]
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include: [
                        {
                            model: A4ImagesModel,
                            as: 'a4_images',
                            required: false
                        },
                        {
                            model: Registration_recipeModel, as: 'registration_recipe',
                            include: [
                                { model: PillModel, as: 'pill' }
                            ]
                        },
                        {
                            model: DoctorModel, as: 'doctor',
                            include: [
                                { model: DoctorCategory, as: 'doctor_category', attributes: ['name'] },
                            ]
                        },
                        { model: register_mkb, as: 'register_mkb' },
                        { model: reg_doctor_categoryModel, as: 'reg_doctor_category' }
                    ]
                },
                {
                    model: surgery_registrationModel, as: 'surgery_registration',
                    include: [
                        {
                            model: surgery_doctorModel,
                            as: 'surgery_doctor'
                        },
                        {
                            model: DoctorModel,
                            as: 'doctor',
                            required: false
                        }
                    ]
                },
                { model: Registration_filesModel, as: 'registration_files' },
                { model: PatientModel, as: 'patient' },
                { model: Registration_payModel, as: 'registration_pay' }
            ],
            order: [
                [
                    {
                        model: Registration_inspectionModel,
                        as: 'registration_inspection',
                    },
                    'id', 'ASC'
                ]
            ],
        });
        if (!Prixod) {
            throw new HttpException(404, 'Not found');
        }else {
            Prixod.registration_inspection.forEach(el => {
                el.registration_inspection_child.sort(function(a, b) {
                    return a.child_id - b.child_id;
                });
            })
            Prixod.registration_palata.sort(function(a, b) {
                return a.date_to - b.date_to;
            });
        }

        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    getOneArxiv = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await arxiv.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: registration_palata_arxivModel, as: 'registration_palata',
                    include: [
                        { model: palataModel, as: 'palatas', attributes: ['name'] }
                    ]
                },
                {
                    model: Registration_doctor_arxivModel, as: 'registration_doctor',
                    include: [
                        {
                            model: Registration_recipe_arxivModel, as: 'registration_recipe',
                            include: [
                                { model: PillModel, as: 'pill' }
                            ]
                        },
                        {
                            model: DoctorModel, as: 'doctor',
                            include: [
                                { model: DoctorCategory, as: 'doctor_category', attributes: ['name'] },
                            ]
                        },
                        { model: reg_doctor_categoryArxiv, as: 'reg_doctor_category_arxiv' }
                    ]
                },
                {
                    model: Registration_inspection_arxivModel, as: 'registration_inspection',
                    include: [
                        { model: Registration_inspection_child_arxxivModel, as: 'registration_inspection_child' },
                        {
                            model: InspectionModel, as: 'inspection',
                            include: [
                                { model: UserModel, as: 'User', attributes: ['user_name'] }
                            ]
                        }
                    ]
                },
                { model: Registration_files_arxivModel, as: 'registration_files' },
                { model: PatientModel, as: 'patient' },
                { model: Registration_pay_arxivModel, as: 'registration_pay' }
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    delQueue = async (req, res, next) => {
        let time = Math.floor(new Date().getTime() / 1000) - 20000;
        await QueueModel.destroy({ where: { datetime: { [Op.lte]: time } } });
        res.send('deleted');
    };

    getPechat = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await QueueModel.findAll({
            // status:"waiting"
            where:{ reg_id: req.params.patient },
            include: [
                { 
                    model: RoomModel, as: 'room'
                },
                { model: UserModel, as: 'user', attributes: ['id', 'user_name', 'doctor_id']},
                { model: PatientModel, as: 'patient'},
                {
                    model: RegistrationModel, as: 'registration',
                    attributes: ['id'],
                    include:[
                        {
                            model: Registration_doctorModel, as: 'registration_doctor', 
                            attributes:['id', 'discount', 'doctor_id', 'pay_summa', 'backlog', 'price', 'key']
                        },
                        {
                            model: Registration_inspectionModel, as: 'registration_inspection',
                            attributes:['id', 'discount', 'user_id', 'pay_summa', 'backlog', 'price', 'key']
                        },
                    ]
                },
            ],
            order: [
                ['number', 'ASC']
            ],
        });
        
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        // for(var element of Prixod){
        //     element.status='printed';
        //     await element.save();
        // }
        res.send(Prixod);
    };
    getByPatient = async (req, res, next) => {
        const Prixod = await ModelModel.findAll({
            where: { patient_id: req.params.id },
            include: [
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },
                {
                    model: surgery_registrationModel,
                    as: 'surgery_registration',
                    include: [
                        {
                            model: surgery_doctorModel,
                            as: 'surgery_doctor'
                        },

                    ]
                },
                {
                    model: registration_palataModel, as: 'registration_palata',
                    include: [
                        {
                            model: palataModel,
                            as: 'palatas',
                            attributes: ['name'],
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
                    ]
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include: [
                        { model: reg_doctor_categoryModel, as: 'reg_doctor_category' },
                        {
                            model: Registration_recipeModel, as: 'registration_recipe',
                            include: [
                                { model: PillModel, as: 'pill' }
                            ]
                        },
                        {
                            model: DoctorModel, as: 'doctor',
                            include: [
                                {
                                    model: DoctorCategory, as: 'doctor_category',
                                },
                            ]
                        },
                        { model: register_mkb, as: 'register_mkb' }
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include: [
                        { model: inspection_categoryModel, as: 'category', attributes: ['name'] },
                        {
                            model: inspectionModel, as: 'inspection', attributes: ['name']
                        },
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                },
                {
                    model: Registration_uziModel, as: 'registration_uzi',
                    include: [
                        { model: Registration_uzi_childModel, as: 'registration_inspection_child' },
                        { model: inspectionModel, as: 'inspection', attributes: ['name'] }
                    ]
                },
                { model: Registration_filesModel, as: 'registration_files' },
                { model: PatientModel, as: 'patient' },
                { model: Registration_payModel, as: 'registration_pay' }
            ]
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        res.send(Prixod);
    };

    create = async (req, res, next) => {
        let transaction = await sequelize.transaction()
        let currentUser = req.currentUser
        let insert = true
        try {
            this.checkValidation(req);
            var { registration_inspection, registration_uzi, registration_doctor, registration_files, registration_palata, registration_pay, surgery_registration, reg_statsionar, registration_drug, ...data } = req.body;
            data.created_at = Math.floor(new Date().getTime() / 1000);
            data.updated_at = Math.floor(new Date().getTime() / 1000);
            if (registration_palata.length > 0) {
              data['type_service'] = 'Statsionar';
            }
            if (!data.patient_id) {
              throw new HttpException(500, 'Something went wrong');
            }

            const model = await ModelModel.create(data, { transaction: transaction });
            if (!model) {
              throw new HttpException(500, 'Something went wrong');
            }
            let datePalata = null 
            if(registration_palata.length > 0){
                datePalata = Number(registration_palata[0].date_to)
            }
            await this.#inspectionadd(model, registration_inspection, registration_pay, insert, transaction, currentUser.role);
            if(currentUser.role != 'Loborant'){
                await this.#doctoradd(model, registration_doctor, registration_pay, insert, transaction, currentUser.role);
                await this.#palataadd(model, registration_palata, registration_pay, insert, datePalata, transaction);
                await this.#statsionarAdd(model, reg_statsionar, insert, transaction);
                await this.#surgeryAdd(model, surgery_registration, registration_pay, insert, transaction);
            }
            await this.#filesadd(model, registration_files, insert, transaction);
            if(currentUser.role == 'Admin' || currentUser.role == 'Registrator' || currentUser.role == 'Kasser'){
                await this.#payAdd(model, registration_pay, insert, transaction);
            }
            if (model.direct_id) {
              await this.#directAdd(model, insert, transaction);
            }
            // await this.#uziAdd(model, registration_uzi);
            await this.#doriadd(model, registration_drug);
            await this.#queue(insert, transaction);
            await transaction.commit()
            res.status(200).send({
              error: false,
              error_code: 200,
              message: 'Malumot qo\'shildi',
              data: model
            });

        } catch (error) {
            await transaction.rollback()
            console.log(error, "tttttttttttttttttt");
            throw new HttpException(500, "Internal server error");
        }
    };

    update = async (req, res, next) => {
        let transaction = await sequelize.transaction()
        let currentUser = req.currentUser
        try{
            this.checkValidation(req);
            let insert = false
            let summa = 0;
            let pay_summa = 0;
            let backlog = 0;
            let discount = 0;
            var {registration_inspection,registration_uzi,registration_doctor,registration_files,registration_palata,registration_pay,surgery_registration, reg_statsionar, registration_drug, ...data} = req.body;
            if(registration_inspection.length){
                for (let index = 0; index < registration_inspection.length; index++) {
                    const el = registration_inspection[index];
                    if(!el.deleted){
                        summa += el.price
                        pay_summa += el.pay_summa;
                        backlog += el.backlog;
                        discount += el.discount;
                    }
                }
            }
            if(registration_doctor.length){
                for (let index = 0; index < registration_doctor.length; index++) {
                    const el = registration_doctor[index];
                    if(!el.deleted){
                        summa += el.price
                        pay_summa += el.pay_summa;
                        backlog += el.backlog;
                        discount += el.discount;
                    }
                }
            }
            if(registration_palata.length){
                for (let index = 0; index < registration_palata.length; index++) {
                    const el = registration_palata[index];
                    if(!el.deleted){
                        summa += el.price
                        pay_summa += el.pay_summa;
                        backlog += el.backlog;
                        discount += el.discount;
                    }
                }
            }
            if(surgery_registration.length){
                for (let index = 0; index < surgery_registration.length; index++) {
                    const el = surgery_registration[index];
                    if(!el.deleted){
                        summa += el.price
                        pay_summa += el.pay_summa;
                        backlog += el.backlog;
                        discount += el.discount;
                    }
                    for (let i = 0; i < el.surgery_doctor.length; i++) {
                        const element = el.surgery_doctor[i];
                        if(!element.deleted){
                            summa += element.price
                            pay_summa += element.pay_summa;
                            backlog += element.backlog;
                            discount += element.discount;
                        }
                    }
                    
                }
            }
            var id = parseInt(req.params.id);
            var model = await ModelModel.findOne({where : {id: id}})
            if(registration_palata.length > 0) {
                data['type_service'] = 'Statsionar';  
            }
            if (!model) {
                throw new HttpException(404, 'data not found');
            }
            model.updated_at = Math.floor(new Date().getTime() / 1000);
            model.user_id = data.user_id;
            model.direct_id = data.direct_id;
            model.status = data.status;
            model.patient_id = data.patient_id;
            model.type_service = data.type_service;
            model.complaint = data.complaint;
            model.summa = summa;
            model.pay_summa = pay_summa;
            model.backlog = backlog;
            model.discount = discount;
            model.hospital_summa = data.hospital_summa;
            await model.validate();
            // if(currentUser.role == 'Admin' || currentUser.role == 'Kasser' || currentUser.role == 'Registrator'){
                await model.save({transaction: transaction});
            // }
            // await model.save({transaction: transaction});
            let datePalata = null 
            if(registration_palata.length > 0){
                datePalata = Number(registration_palata[0].date_to)
            }
            await this.#inspectionadd(model, registration_inspection, registration_pay, insert, transaction, currentUser.role);
            if(currentUser.role != 'Loborant'){
                await this.#doctoradd(model, registration_doctor, registration_pay, insert, transaction, currentUser.role);
                await this.#palataadd(model, registration_palata, registration_pay, insert, datePalata, transaction);
                await this.#statsionarAdd(model, reg_statsionar, insert, transaction);
                await this.#surgeryAdd(model, surgery_registration, registration_pay, insert, transaction);
            }
            await this.#filesadd(model, registration_files, insert, transaction);
            
            if(model.direct_id) {
                await this.#directAdd(model, insert, transaction);
            }
            await this.#doriadd(model, registration_drug);
            if(currentUser.role == 'Admin' || currentUser.role == 'Registrator' || currentUser.role == 'Kasser'){
                await this.#payAdd(model, registration_pay, insert, transaction);
            }
            await this.#queue(insert, transaction);
            await transaction.commit()
            res.status(200).send({
                error: false,
                error_code: 200,
                message: 'Malumot saqlandi',
                data: model
            });
        } catch(error){
            await transaction.rollback()
            console.log("STACK", error.stack)
            throw new HttpException(500, 'Something went wrong');
        }
    };

    #directAdd = async (model, insert, transaction) => {
        if (!insert) {
            await this.#deleteDirect(model.id, transaction)
        }
        const direct = await directModel.findOne({
            where: {
                id: model.direct_id
            },
            raw: true
        })
        if (direct) {
            var directs = {
                "date_time": Number(model.created_at),
                "type": 0,
                "price": direct.bonus_type ? (model.summa * direct.bonus) / 100 : direct.bonus,
                "doc_id": model.id,
                "summa": model.summa,
                "doc_type": "kirim",
                "comment": "",
                "place": "Registration",
                "direct_id": model.direct_id
            }
            const direc = await registerDirectModel.create(directs, {transaction: transaction});
            await this.#medDirect(direc, model, direct, insert, transaction);
        }

    }
    #medDirect = async (direc, model, direct, insert, transaction) => {
        if (!insert) {
            await this.#medDelete(model.id, transaction)
        }
        let meds;
        if (direct != null) {
            meds = await med_directModel.findOne({
                where: {
                    id: direct.med_id
                }
            })
        }
        var med = {
            "date_time": Math.floor(new Date().getTime() / 1000),
            "type": 0,
            "price": meds != undefined ? (direc.price * meds.bonus) / 100 : 0,
            "doc_id": direc.doc_id,
            "doc_type": "kirim",
            "comment": "",
            "place": "Registration",
            "direct_id": direct != null ? direct.med_id : 0
        }
        await registerMedDirectModel.create(med, {transaction: transaction});
    }
    #surgeryAdd = async (model, surgery_registration, registration_pay, insert, transaction) => {
        if (!insert) {
            await this.#deleteSurgery(model.id , transaction)
        }
        let surgery;
        let dataDoctors = []
        let dataReg = []
        for (let element of surgery_registration) {
            const { surgery_doctor, ...data } = element;
            let doctor_oper = await surgerygModel.findOne({ where: { doctor_id: data.doctor_id } });
            let tempSurgery = await surgerygModel.findOne({ where: { id: data.surgery_id } });
            let doctor_summa = ((data.price * (tempSurgery.doctor_precent ? tempSurgery.doctor_precent : 0)) / 100).toFixed(3);
            surgery = {
                'doctor_id': data.doctor_id,
                'registration_id': model.id,
                'status': data.status,
                'surgery_id': data.surgery_id,
                'type': 0,
                'date_time': Number(data.date_time),
                "date_doctor": data.date_doctor,
                'all_summa': data.all_summa,
                'text': data.text,
                "before_sur_text": data.before_sur_text,
                "after_sur_text": data.after_sur_text,
                'name': data.name,
                'price': data.price,
                'vazvrat': data.vazvrat,
                "backlog": data.backlog,
                "discount": data.discount,
                "pay_summa": data.pay_summa,
                "key": data.key
            }
            for (const el of registration_pay) {
                if (el.status == 'surgery' && el.key == element.key) {

                    let doctors = {
                        "date_time": Number(data.date_time),
                        "type": 0,
                        "price": Math.floor((data.price * doctor_oper?.dataValues.doctor_precent) / 100),
                        "doc_id": model.id,
                        "doctor_id": el.doctor_id,
                        "doc_type": 'kirim',
                        "place": "Registration Operatsiya",
                        "comment": el.comment,
                        "pay_type": el.pay_type,
                        "summa_type": el.summa,

                    }
                    if (!data.vazvrat) {
                        dataDoctors.push(doctors)
                    }
                }
            }
            let surgerys = await surgery_registrationModel.create(surgery, {transaction: transaction});
            if (model.backlog == 0) {

                let regSur = {
                    "date_time": Number(data.date_time),
                    "type": 0,
                    "price": data.all_summa,
                    "surgery_price": data.price,
                    "doc_id": model.id,
                    "surgery_id": data.surgery_id,
                    "doc_type": 'kirim',
                    "place": "Registration",
                    "comment": ""
                }
                if (!data.vazvrat) {
                    dataReg.push(regSur)
                }
            }
            await this.#surgeryDoctor(surgerys, surgery_doctor, insert, transaction)
        }
        await register_doctorModel.bulkCreate(dataDoctors, {transaction: transaction})
        await register_surgeryModel.bulkCreate(dataReg, {transaction: transaction})
    }

    #surgeryDoctor = async (surgery, surgery_doctor, insert, transaction) => {
        if (!insert) {
            await this.#deleteSurgeryDoctor(surgery.id, transaction)
            await register_surgerycategoryModel.destroy({
                where: {
                    doc_id: surgery.registration_id,
                },
                transaction: transaction
            })
            await register_doctorModel.destroy({
                where: {
                    doc_id: surgery.registration_id,
                    place: 'Registration Operatsiya Qoshimcha'
                },
                transaction: transaction
            })
        }
        let doctor = {}
        let dataDoctor = []
        let dataRegDoctor = []
        let dataRegData = []
        for (let key of surgery_doctor) {
            doctor = {
                'name': key.name,
                'registration_id': surgery.registration_id,
                'doctor_id': key.doctor_id,
                'price': key.price,
                "parent_id": surgery.id,
                "category_id": key.category_id,
                "vazvrat": key.vazvrat,
                "backlog": key.backlog,
                "discount": key.discount,
                "pay_summa": key.pay_summa,
                "key": key.key
            }
            dataDoctor.push(doctor)
            const cat = await surgeryCategoryModel.findOne({
                where: {
                    id: key.category_id
                }
            })
            let regData = {
                date_time: Number(surgery.date_time),
                price: Math.floor((key.price * cat.percent) / 100),
                doc_id: surgery.registration_id,
                surgery_id: surgery.surgery_id,
                doc_type: 'Registration',
                all_price: key.price,
                doctor_id: key.doctor_id,
                place: 'Registration operatsiya',
                category_id: key.category_id,
            }
            let regDoctor = {
                date_time: Number(surgery.date_time),
                vazvrat: key.vazvrat,
                type: 0,
                price: Math.floor((key.price * cat.percent) / 100),
                doc_id: surgery.registration_id,
                doc_type: 'kirim',
                doctor_id: key.doctor_id,
                comment: '',
                place: 'Registration Operatsiya Qoshimcha'
            }
            
            if (!key.vazvrat && !surgery.vazvrat) {
                dataRegDoctor.push(regDoctor)
                dataRegData.push(regData)
            }
        }
        await surgery_doctorModel.bulkCreate(dataDoctor)
        await register_doctorModel.bulkCreate(dataRegDoctor)
        await register_surgerycategoryModel.bulkCreate(dataRegData)
    }
    #deleteQueue = async (id) => {
        await QueueModel.destroy({
            where: {
                patient_id: id
            }
        })
    }
    delete = async (req, res, next) => {
        const id = req.params.id;
        const data = await ModelModel.findOne({
            where: {
                id: id
            }
        })
        const result = await ModelModel.destroy({ where: { id: id } });
        await this.#deleteQueue(data.patient_id)
        await this.#deleteDoctor(id);
        await this.#deleteKassa(id);
        await this.#deleteIns(id);
        await this.#deletedoctor(id);
        await this.#deleteRecipe(id);
        await this.#deleteInspection(id);
        await this.#deleteFiles(id);
        await this.#deletePalata(id);
        await this.#deletepay(id);
        await this.#deleteTashxis(id);
        
        await register_reagentModel.destroy({
            where: {
                doc_id: id,
                doc_type: docTypes.auto_rasxod_reagent
            }
        })

        if (!result) {
            throw new HttpException(404, 'Not found');
        }
        
        this.#deleteSurgery(id)

        res.send('Has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
    #payAdd = async (model, registration_pay, insert, transaction) => {
        if (!insert) {
            await this.#deletepay(model.id, transaction);
            await this.#deleteKassa(model.id, transaction);
        }
        let data = []
        let dataX = []
        for (var element of registration_pay) {
            var pay = {
                "user_id": element.user_id,
                "registration_id": model.id,
                "pay_type": element.pay_type,
                "summa": element.summa,
                "discount": element.discount,
                "umumiy_sum": element.umumiy_sum,
                "backlog": element.backlog,
                "comment": element.comment,
                "key": element.key,
                "hodim_id": element.hodim_id,
                "doctor_id": element.doctor_id,
                "status": element.status,
                "date_time": Number(element.date_time)
            }
            data.push(pay)

            let type = 0, doc_type = '';
            if (element.pay_type == 'Plastik') {
                type = 0,
                    doc_type = 'kirim'
            }
            else if (element.pay_type == 'Naqt') {
                type = 0,
                    doc_type = 'kirim'
            }
            else if (!element.summa) {
                type = 1,
                    doc_type = 'kirim'
            }
            else {
                doc_type = 'kirim'
            }
            
            let x = {
                "date_time": Number(element.date_time),
                "doctor_id": model.id,
                "pay_type": element.pay_type,
                "price": element.summa,
                "type": type,
                "doc_type": 'Kirim',
                "place": "registration",
                "comment": element.comment
            }
            dataX.push(x)
        }
        await Register_kassaModel.bulkCreate(dataX, { transaction: transaction })
        await Registration_payModel.bulkCreate(data, { transaction: transaction });
    }

    #statsionarAdd = async (model, reg_statsionar, insert, transaction) => {
        // let {reg_statsionar_doctor, ...dataStat} = reg_statsionar

        if (!insert) {
            await this.#deleteReg_statsionar(model.id, transaction)
        }
        for (const el of reg_statsionar) {
            let data = {
                statsionar_text: el.statsionar_text,
                text: el.text,
                reg_id: model.id,
                arrive_day: el.arrive_day,
                recede_day: el.recede_day
            }
            const modelStat = await reg_statsionarModel.create(data, {transaction: transaction})
            this.#statDoctor(model, el.reg_statsionar_doctor, modelStat.id, insert, transaction)
        }
    }
    #statDoctor = async (model, reg_statsionar_doctor, id, insert) => {
        if (!insert) {
            this.#deleteStatDoctor(model.id, transaction)
        }
        for (const el of reg_statsionar_doctor) {
            let data = {
                reg_stat_id: id,
                statsionar_text: el.statsionar_text,
                text: el.text,
                reg_id: model.id,
                doctor_id: el.doctor_id
            }
            const modelStatDoctor = await reg_statsionar_doctorModel.create(data, {transaction: transaction})
            this.#statDoctorTesxt(model, el.reg_stat_doctor_text, modelStatDoctor.id, insert)
        }
    }
    #statDoctorTesxt = async (model, reg_stat_doctor_text, id, insert, transaction) => {
        if (!insert) {
            await this.#deleteStatDoctorText(model.id, transaction)
        }
        let dataBulk = []
        for (const el of reg_stat_doctor_text) {
            let data = {
                parent_id: id,
                statsionar_text: el.statsionar_text,
                day: el.day,
                text: el.text,
                reg_id: model.id,
                doctor_id: el.doctor_id
            }
            dataBulk.push(data)
        }
        await reg_stat_doctor_textModal.bulkCreate(dataBulk, {transaction: transaction});
    }
    #deleteReg_statsionar = async (id, transaction) => {
        await reg_statsionarModel.destroy({
            where: { reg_id: id },
            transaction: transaction
        })
    }
    #deleteStatDoctor = async (id, transaction) => {
        await reg_statsionar_doctorModel.destroy({
            where: { reg_id: id },
            transaction: transaction
        })
    }
    #deleteStatDoctorText = async (id, transaction) => {
        await reg_stat_doctor_textModal.destroy({
            where: { reg_id: id },
            transaction: transaction
        })
    }
    #inspectionadd = async (model, registration_inspection, registration_pay, insert, transaction, role) => {
        if (!insert) {
            await this.#deleteIns(model.id, transaction);
            // await this.#deleteInspection(model.id);
        }
        let dataTekshiruv = []
        let dataUserReg = []
        for (const item of registration_inspection) {
            var { registration_inspection_child, registration_inspection, ...data } = item;
            if (item.deleted) {
                await this.#deleteInspectionReg(item.key, transaction);
            }
            
            if(!item.deleted){
                await A4ImagesModel.destroy({
                    where: {
                        key: item.key,
                    }
                })
    
                for (const el of item.a4_images) {
                    await A4ImagesModel.create({
                        key:  item.key,
                        image_name: el.image_name,
                    })
                }
    
                let user = await UserModel.findOne({
                    where: {
                        id: item.user_id
                    },
                    raw: true
                })
                let inspec = null
                if(user.doctor_id){
                    inspec = await inspectionModel.findOne({
                        where: {
                            id: item.inspection_id
                        }
                    })
                }
                if (user) {
                    data.registration_id = model.id;
                    if (item.vazvrat != true) {
                        if(item.price != 0){
                            for (const el of registration_pay) {
                                if(el.status == 'inspection' && el.key == item.key){
                                    let  tekshiruv = {
                                        "date_time": Number(item.date_time),
                                        "type": item.type,
                                        "price": el.summa + el.discount,
                                        "doctor_price": Math.floor( inspec ? ((el.summa + el.discount)*inspec.percent_bonus)/100 : ((el.summa + el.discount)*user.percent)/100),
                                        "doc_id": model.id,
                                        "user_id": el.hodim_id,
                                        "inspection_id": item.inspection_id,
                                        "inspection_category": item.category_id,
                                        "skidka": item.skidka,
                                        "doc_type": 'kirim',
                                        "place": "Registration",
                                        "comment": el.comment,
                                        "pay_type": el.pay_type,
                                        "summa_type": el.summa
                                    }
                                    dataTekshiruv.push(tekshiruv)
        
                                    let UserReg = {
                                        date_time: Number(item.date_time),
                                        type: 0,
                                        price: Math.floor( inspec ? ((el.summa + el.discount)*inspec.percent_bonus)/100 : ((el.summa + el.discount) * user.percent)/100),
                                        doc_id: model.id,
                                        doc_type: 'kirim',
                                        place: 'Registration inspection',
                                        pay_type: el.pay_type,
                                        summa_type: el.summa,
                                        user_id: el.hodim_id,
                                        comment: el.comment,
                                    }
                                    dataUserReg.push(UserReg)
                                }
                            }
                        } else {
                            let  tekshiruv = {
                                "date_time": Number(item.date_time),
                                "type": item.type,
                                "price": 0,
                                "doctor_price": 0,
                                "doc_id": model.id,
                                "user_id": item.user_id,
                                "inspection_id": item.inspection_id,
                                "inspection_category": item.category_id,
                                "skidka": item.skidka,
                                "doc_type": 'kirim',
                                "place": "Registration",
                                "comment": '',
                                "pay_type": 'Naqt',
                                "summa_type": 0
                            }
                            dataTekshiruv.push(tekshiruv)
                            
                            let UserReg = {
                                date_time: Number(item.date_time),
                                type: 0,
                                price: 0,
                                doc_id: model.id,
                                doc_type: 'kirim',
                                place: 'Registration inspection',
                                pay_type: 'Naqt',
                                summa_type: 0,
                                user_id: item.user_id,
                                comment: '',
                            }
                            dataUserReg.push(UserReg)
                        }
                    }
                    if(item.update){
                        let dds = await Registration_inspectionModel.findOne({
                            where: {
                                key: item.key
                            }
                        })
                        if (dds){
                            if (role == 'Loborant'){
                                dds.status = data.status
                            } else {
                                dds.inspection_id = item.inspection_id
                                dds.user_id = item.user_id
                                dds.registration_id = model.id
                                dds.type = item.type
                                dds.price = Number(item.price)
                                dds.category_id = item.category_id
                                dds.date_time = item.date_time
                                dds.skidka = item.skidka
                                dds.uzi = item.uzi
                                dds.select = item.select
                                dds.date_doctor = item.date_doctor
                                dds.vazvrat = item.vazvrat
                                dds.shablon = item.shablon
                                dds.patient_id = model.patient_id
                                dds.backlog = Number(item.backlog)
                                dds.discount = Number(item.discount)
                                dds.pay_summa = Number(item.pay_summa)
                                dds.key = item.key
                                dds.table_type = item.table_type
                                if(role == 'Admin'){
                                    dds.status = item.status
                                }
                            }
                            if(item.chek) {
                                dds['chek'] = true;
                            } else {
                                dds['chek'] = false;
                            }
                            let models = await dds.save({transaction: transaction})
                            await this.#inspectionchildadd(model, models, registration_inspection_child, insert, transaction, role);
                        } else {
                            dds = {
                                "inspection_id": item.inspection_id,
                                "user_id": item.user_id,
                                "registration_id": model.id,
                                "type": item.type,
                                "price": item.price,
                                "category_id": item.category_id,
                                'status': data.status,
                                "date_time": item.date_time,
                                "skidka": item.skidka,
                                "uzi": item.uzi,
                                "select": item.select,
                                "date_doctor": item.date_doctor,
                                "vazvrat": item.vazvrat,
                                "shablon": item.shablon,
                                "patient_id": model.patient_id,
                                "backlog": item.backlog,
                                "discount": item.discount,
                                "pay_summa": item.pay_summa,
                                "key": item.key,
                                "table_type": item.table_type
                            }
                            if(item.chek) {
                                dds['chek'] = true;
                            } else {
                                dds['chek'] = false;
                            }
                            let models = await Registration_inspectionModel.create(dds, {
                                transaction: transaction
                            });
                            await this.#inspectionchildadd(model, models, registration_inspection_child, insert, transaction);
                        }
                    
                        // await register_reagentModel.destroy({
                        //     where: {
                        //         reg_inspection_key: model.key,
                        //         doc_type: docTypes.auto_rasxod_reagent
                        //     },
                        //     transaction: transaction
                        // })
                    }
    
                    function isHave(item) {
                        return item.room_id == user.room_id && item.patient_id == model.patient_id;
                    }
    
                    var have = await this.q.find(isHave);
                    if (have == undefined) {
                        this.q.push({
                            "room_id":user.room_id,
                            "patient_id":model.patient_id,
                            "number":0,
                            "date_time":Math.floor(new Date().getTime() / 1000),
                            "status":data.status,
                            "reg_id": model.id,
                            "user_id":user.id
                        });
                    }
                    else if (data.status != have.status) {
                        if (data.status != 'complate') {
                            var index = this.q.findIndex(isHave);
                            this.q[index].status = have.status;
                        } else if (have.status != 'complate') {
                            var index = this.q.findIndex(isHave);
                            this.q[index].status = have.status;
                        }
                    }
                }
                else {
                    throw new HttpException(404, "user not found")
                }
            }

        }
        await Register_inspectionModel.bulkCreate(dataTekshiruv, {transaction: transaction})
        await registerUserModel.bulkCreate(dataUserReg, {transaction: transaction})
    }

    #inspectionchildadd = async (model, models, registration_inspection_child, insert, transaction, role) => {
        let bulk = [];
        let dataDds = []
        // let datas = await Registration_inspection_childModel.findAll({
            //     where: {
                //         parent_id: models.id
            //     },
            //     raw: true
        // })
        for (var element of registration_inspection_child) {
            let child = {}
            // if(datas.length){
                //     for (const el of datas) {
                    //         if(el.id == element.id){
                        //             if(role != 'Loborant'){
                            //                 child = {
                                //                     "text": el.text,
                                //                     "norm": el.norm,
                                //                     "status": el.status,
                                //                     "name": el.name,
                                //                     "parent_id": models.id,
                                //                     "registration_id": models.registration_id,
                                //                     "price": element.price,
                                //                     "checked": element.checked,
                                //                     "select": element.select,
                                //                     "vazvrat": element.vazvrat,
                                //                     "file": element.file,
                                //                     "child_id": element.child_id ? element.child_id : element.id
                            //                 }

                            //                 if(role == 'Admin'){
                                //                     child.text = element.text
                                //                     child.norm = element.norm
                                //                     child.status = models.status
                                //                     child.name = element.name
                            //                 }
            //                 dataDds.push(child)
                        //             } else {
                            //                 child = {
                                //                     "text": element.text,
                                //                     "norm": element.norm,
                                //                     "status": models.status,
                                //                     "name": element.name,
                                //                     "parent_id": models.id,
                                //                     "registration_id": models.registration_id,
                                //                     "price": el.price,
                                //                     "checked": el.checked,
                                //                     "select": el.select,
                                //                     "vazvrat": el.vazvrat,
                                //                     "file": el.file,
                                //                     "child_id": el.child_id
                            //                 }
            //             }
            //             dataDds.push(child)
            //         }
            //     }
            // } else {
                child = {
                    "parent_id": models.id,
                    "text": element.text,
                    "norm": element.norm,
                    "name": element.name,
                    "registration_id": models.registration_id,
                    "status": models.status,
                    "price": element.price,
                    "checked": element.checked,
                    "select": element.select,
                    "vazvrat": element.vazvrat,
                    "file": element.file,
                    "child_id": element.child_id ? element.child_id : element.id
                }
                dataDds.push(child)
            // }
            if (!element.child_id || !element.id) continue
            const calc = await InspectionReagentCalcModel.findAll({
                where: {
                    inspection_child_id: element.child_id || element.id,
                }
            })
            
            if(calc.length) {
                for (let index = 0; index < calc.length; index++) {
                    const el = calc[index];
                    let query = "SELECT `s`.`date_time`, `s`.`price`, `reg`.`reagent_id`, `reg`.`sereis_id`, \
                            SUM(CASE WHEN `reg`.`type` = 1 THEN `reg`.`count` \
                            WHEN `reg`.`type` = 0 THEN -`reg`.`count` ELSE 0 END) as `ost` \
                            from `register_reagent` as `reg` LEFT JOIN `sereis` as `s` ON `reg`.`sereis_id` = `s`.`id` \
                            WHERE `reg`.`reagent_id` = " + el.reagent_id + " \
                            GROUP BY `reg`.`sereis_id` HAVING `ost` > 0 ORDER BY `s`.`date_time` ASC"
                    let osts = null
                    
                    if(query){
                        osts = await sequelize.query(
                            query, 
                            {
                                type: QueryTypes.SELECT,
                                nest: true,
                            }
                        );
                    }

                    let tempCount = el.count;
                    let bulkReagentReg = [];
                    if(osts.length && tempCount){
                        for (let i = 0; i < osts.length; i++) {
                            const tempOst = osts[i];
                            if(tempOst) {

                                if (tempCount == 0) {
                                    break;
                                }

                                if (tempCount >= tempOst.ost && tempOst.ost > 0) {
                                    tempCount -= tempOst.ost;
                                    bulkReagentReg.push({
                                        reagent_id: el.reagent_id,
                                        date_time: model.created_at,
                                        price: tempOst.price,
                                        count: tempOst.ost,
                                        summa: tempOst.price * tempOst.ost,
                                        doc_id: model.id,
                                        doc_type: docTypes.auto_rasxod_reagent,
                                        type: 0,
                                        sereis_id: tempOst.sereis_id,
                                        reg_inspection_key: models.key,
                                        ins_cat_id: models.category_id,
                                        inspection_id: models.inspection_id
                                    })
                                    osts[i][0].ost = 0;
                                } else {
                                    bulkReagentReg.push({
                                        reagent_id: el.reagent_id,
                                        date_time: model.created_at,
                                        price: tempOst.price,
                                        count: tempCount,
                                        summa: tempOst.price * tempCount,
                                        doc_id: model.id,
                                        doc_type: docTypes.auto_rasxod_reagent,
                                        type: 0,
                                        sereis_id: tempOst.sereis_id,
                                        reg_inspection_key: models.key,
                                        ins_cat_id: models.category_id,
                                        inspection_id: models.inspection_id
                                    })
                                    tempCount = 0
                                }
                            }
                        }
                        await register_reagentModel.bulkCreate(bulkReagentReg, {transaction: transaction})
                    }
                }
            }
        }
        await Registration_inspection_childModel.destroy({
            where: {
                parent_id: models.id
            },
            transaction: transaction
        })
        console.log(dataDds, "hehheheehheheehhe")
        await Registration_inspection_childModel.bulkCreate(dataDds, {transaction: transaction});
        // await register_reagentModel.bulkCreate(bulk);
    }
    #palataadd = async (model, registration_palata, registration_pay, insert, datetime, transaction ) => {
        var date_time = Math.floor(new Date().getTime() / 1000);
        if (!insert) {
            await this.#deletePalata(model.id, transaction);
        }
        let dataPlata = []
        let dataBulkDocreg = []
        let dataPalataRegister = []
        for (let element of registration_palata) {
            let palata = {
                "palata_id": element.palata_id,
                "user_id": element.user_id,
                "registration_id": model.id,
                'price': element.price,
                'pay_summa': element.pay_summa,
                'discount': element.discount,
                'backlog': element.backlog,
                'key': element.key,
                "date_time": element.date_do,
                "date_do": element.date_do,
                "date_to": element.date_to,
                "day": element.day,
                "vazvrat": element.vazvrat,
                "total_price": element.total_price,
                "comment": element.comment,
                "category_id": element.category_id,
                "room_id": element.room_id,
                "patient_id": model.patient_id
            };
            dataPlata.push(palata)
            let pDoctor = false;
            if (element.user_id) {
                pDoctor = await UserModel.findOne({
                    where: {
                        doctor_id: element.user_id
                    }
                })
            }
            if (pDoctor && datetime) {
                registration_pay.forEach(async el => {
                    await RegisterDoctorModel.destroy({
                        where: {
                            doc_id: model.id,
                            place: "Registration palata"
                        },
                        transaction: transaction
                    })
                    if (el.status == 'palata' && el.key == element.key) {
                        let bulkDocreg = {
                            date_time: el.date_time,
                            vazvrat: element.vazvrat,
                            type: 0,
                            price: Math.floor((element.total_price * pDoctor.palata_percent) / 100),
                            doc_id: model.id,
                            doc_type: "kirim",
                            pay_type: el.pay_type,
                            summa_type: el.summa,
                            doctor_id: el.hodim_id,
                            comment: el.comment,
                            place: 'Registration palata'
                        }
                        dataBulkDocreg.push(bulkDocreg)
                        // var date_time = Math.floor(new Date().getTime() / 1000);

                        let palataRegister = {
                            "palata_id": element.palata_id,
                            "patient_id": model.patient_id,
                            "registration_id": model.id,
                            "price": el.summa + el.discount,
                            "pay_type": el.pay_type,
                            "summa_type": el.summa,
                            "day": element.day,
                            "category_id": element.category_id,
                            "room_id": element.room_id,
                            "date_to": element.date_to,
                            "date_do": element.date_do,
                            "date_time": el.date_time,
                            "doctor_id": element.user_id,
                            "doctor_price": Math.floor(((el.summa + el.discount) * pDoctor.palata_percent) / 100)
                        }
                        if (element.vazvrat != true) {
                            dataPalataRegister.push(palataRegister)
                        }
                    }
                })
            }

        }
        await RegisterDoctorModel.bulkCreate(dataBulkDocreg, {transaction: transaction});
        await registration_palataModel.bulkCreate(dataPlata, {transaction: transaction});
        await register_palataModel.bulkCreate(dataPalataRegister, {transaction: transaction});
    }

    #doctoradd = async (model, registration_doctor, registration_pay, insert, transaction, role) => {
        if(!insert){
            await this.#deleteDoctor(model.id, transaction);
            // await this.#deletedoctor(model.id);
        }
        let dataDoctor = []
        for (var element of registration_doctor) {
            if(element.deleted) {
                await this.#deletedoctorReg(element.key, transaction);
            }
            if(!element.deleted){
                await A4ImagesModel.destroy({
                    where: {
                        key: element.key,
                    }
                })

                for (const el of element.a4_images) {
                    await A4ImagesModel.create({
                        key:  element.key,
                        image_name: el.image_name,
                    })
                }

                let user = await UserModel.findOne({
                    where: {
                        doctor_id: element.doctor_id
                    },
                    raw: true
                })
                let models = element
                var { registration_recipe, register_mkb, reg_doctor_category, ...data } = element;

                if(element.price != 0){
                    for(var el of registration_pay) {
                        if(el.status == 'doctor' && el.key == element.key){
                            let doctor = {
                                "date_time": Number(element.date_time),
                                "type": 0,
                                "price": Math.floor(((el.summa + el.discount) * user.percent)/100),
                                "doc_id": model.id, 
                                "doctor_id": el.doctor_id,
                                "doc_type": 'kirim',
                                "place": "Registration",
                                "comment": el.comment,
                                "pay_type": el.pay_type,
                                "summa_type": el.summa,
                                "all_sum": el.summa + el.discount
                            }
                            if(!data.vazvrat){
                                dataDoctor.push(doctor)
                            }
                        }
                    }
                } else {
                    let doctor = {
                        "date_time": Number(element.date_time),
                        "type": 0,
                        "price": 0,
                        "doc_id": model.id, 
                        "doctor_id": element.doctor_id,
                        "doc_type": 'kirim',
                        "place": "Registration",
                        "comment": '',
                        "pay_type": 'Naqt',
                        "summa_type": 0,
                        "all_sum": 0
                    }
                    if(!data.vazvrat){
                        dataDoctor.push(doctor)
                    }
                }
    
                if(element.update){
                    let news = await Registration_doctorModel.findOne({
                        where: {
                            key: element.key
                        }
                    })
                    if(news){
                        if(role != 'Shifokor'){
                            news.doctor_id = element.doctor_id
                            news.registration_id = model.id
                            news.price = data.price
                            news.status = data.status
                            news.text = data.text
                            news.vazvrat = data.vazvrat
                            news.date_time = Number(element.date_time)
                            news.date_doctor = element.date_doctor
                            news.patient_id = model.patient_id
                            news.backlog = element.backlog
                            news.discount = element.discount
                            news.pay_summa = element.pay_summa
                            news.key = element.key
                            // news.direct_id = element.direct_id
                            news.table_type = element.table_type
                        } else {
                            news.text = element.text
                        }
                        models = await news.save({transaction: transaction})
                    } else {
                        news = {
                            "doctor_id":element.doctor_id,
                            "registration_id":model.id,
                            "price":data.price,
                            "status": data.status,
                            "text":data.text,
                            "vazvrat":data.vazvrat,
                            "date_time": Number(element.date_time),
                            "date_doctor": element.date_doctor,
                            "patient_id": model.patient_id,
                            "backlog": element.backlog,
                            "discount": element.discount,
                            "pay_summa": element.pay_summa,
                            "key": element.key,
                            // "direct_id": element.direct_id,
                            "table_type": element.table_type
                        };
                        models = await Registration_doctorModel.create(news, {transaction: transaction});
                    }
                    await this.#recieptadd(models, registration_recipe, insert, transaction);
                    await this.#tashxisAdd(model, models, register_mkb, insert, transaction);
                    await this.#doctorCategory(models, reg_doctor_category, insert, transaction);
                }
                function isHave(item) {
                    return item.room_id == user.room_id && item.patient_id == model.patient_id;
                }
                var have = await this.q.find(isHave);
                if (have == undefined) {
                    this.q.push({
                        "room_id": user.room_id,
                        "patient_id": model.patient_id,
                        "number": 0,
                        "date_time": Math.floor(new Date().getTime() / 1000),
                        "status": element.status,
                        "reg_id":model.id,
                        "user_id":user.id
                    });
                } else if (data.status != have.status) {
                    if (data.status != 'complate') {
                        var index = this.q.findIndex(isHave);
                        this.q[index].status = have.status;
                    } else if (have.status != 'complate') {
                        var index = this.q.findIndex(isHave);
                        this.q[index].status = have.status;
                    }
                }
            }
        }
        await RegisterDoctorModel.bulkCreate(dataDoctor, {transaction: transaction})
    }
    #deleteDrug = async (id , transaction) => {
        let drugs = await RegistrationDrugModel.findAll({
            where: { reg_id: id },
            transaction: transaction
        })
        for (const item of drugs) {
            await RegistrationDrugChildModel.destroy({
                where: {   parent_id: item.id,  },
                transaction: transaction
            })
        }
        await RegistrationDrugModel.destroy({
            where: { reg_id: id },
            transaction: transaction
        })
    }
    #deleteRegisterDori = async  (id, transaction) =>{
        await register_doriModel.destroy({
            where: {  doc_id: id },
            transaction: transaction
        })
    }
    #doriadd = async (model, registration_drug, insert, transaction) => {
        if (!insert) {
            // await this.#deleteDrug(model.id, transaction)
            // await this.#deleteRegisterDori(model.id , transaction)
        }
        let data = []
        for (let element of registration_drug) {
            
            let drug = {
                'reg_id': model.id,
                'user_id': element.user_id,
                'days': JSON.stringify(element.days)
            }
            const models = await RegistrationDrugModel.create(drug, {transaction: transaction});
            // debugger
            for (let child of element.registration_drug_child) {
                let drug_child = {
                    "parent_id": models.id,
                    "dori_id": child.dori_id,
                    "day": child.day,
                    "comment": child.comment,
                    "status": child.status,
                    "count":child.count
                }

                await RegistrationDrugChildModel.create(drug_child , transaction)
                let query = "SELECT `s`.`date_time`, `s`.`price`, `reg`.`dori_id`, `reg`.`series_id`, \
                        SUM(CASE WHEN `reg`.`type` = 1 THEN `reg`.`count` \
                        WHEN `reg`.`type` = 0 THEN -`reg`.`count` ELSE 0 END) as `ost` \
                        from `register_dori` as `reg` LEFT JOIN `dori_series` as `s` ON `reg`.`series_id` = `s`.`id` \
                        WHERE `reg`.`dori_id` = " + child.dori_id + " \
                        GROUP BY `reg`.`series_id` HAVING `ost` > 0 ORDER BY `s`.`date_time` ASC"

                let osts = await sequelize.query(query);
                let tempCount = child.count;
                if (child.status == true) {
                    for (let i = 0; i < osts.length; i++) {
                        const tempOst = osts[i][0];
                        if (tempCount == 0) {
                            break;
                        }
                        // console.log("OST",tempOst);
                        var dori = {
                            "dori_id": child.dori_id,
                            "price": tempOst.price,
                            "doc_id": model.id,
                            "count": child.count,
                            "summa": tempOst.price *  child.count,
                            "type": 0,
                            "series_id": 1,
                            "date_time": Math.floor(new Date().getTime() / 1000),
                            "doc_type": "chiqim",
                            "parent_id":model.patient_id
                        }
                        
                        data.push(dori)
                        // break;
                    }
                }
            }
        }
        await register_doriModel.bulkCreate(data, {transaction: transaction});
    }
    #doctorCategory = async (models, reg_doctor_category, insert, transaction) => {
        if (!insert) {
            this.#deleteCategory(models.id, transaction);
        }
        let data = []
        for (let element of reg_doctor_category) {
            let category = {
                'name': element.name,
                'price': element.price,
                'doctor_id': models.id,
                'reg_id': models.registration_id,
                'vazvrat': element.vazvrat,
                'patient_id': models.patient_id,
                'date_time': models.date_time,
                'text': element.text
            }
            data.push(category)
        }
        await reg_doctor_categoryModel.bulkCreate(data, {transaction: transaction})
    }
    #recieptadd = async (model, registration_recipe, insert, transaction) => {
        if (!insert) {
            await this.#deleteRecipe(model.id, transaction);
        }
        var adds;
        let data = []
        for (var element of registration_recipe) {
            adds = {
                "registration_doctor_id": model.id,
                "registration_id": model.registration_id,
                'pill_id': element.pill_id,
                "time": element.time,
                "day": element.day,
                "comment": element.comment,
                "name": element.name
            };
            data.push(adds)
        }
        await Registration_recipeModel.bulkCreate(data, {transaction: transaction});
    }
    #filesadd = async (model, registration_files, insert = true) => {
        if (!insert) {
            await this.#deleteFiles(model.id);
        }
        var asas;
        for (var element of registration_files) {
            asas = { 'registration_id': model.id, "href": element.href };
            await Registration_filesModel.create(asas);
        }
    }
    #tashxisAdd = async (model, models, register_mkb, insert, transaction) => {
        if (!insert) {
            await this.#deleteTashxis(model.id, transaction);
        }
        var asas;
        let data = []
        var date_time = Math.floor(new Date().getTime() / 1000);
        for (var element of (register_mkb)) {
            asas = {
                'registration_id': models.id,
                "mkb_id": element.mkb_id,
                "name": element.name,
                "datetime": date_time,
                "patient_id": model.patient_id,
                "doctor_id": element.doctor_id
            };
            data.push(asas)
        }
        await Register_mkb.bulkCreate(data, {transaction: transaction});
    }
    #queue = async (insert, transaction) => {
        for (var element of this.q) {
            let queue = await QueueModel.findOne({
                where: {
                    room_id: element.room_id,
                    patient_id: element.patient_id,
                    reg_id: element.reg_id
                }
            })
            if(queue){
                queue.status = element.status;
                await queue.save({transaction: transaction});
            } else {
                let queueRoom = await QueueModel.findOne({
                    where: {
                        room_id: element.room_id,
                    },
                    order: [
                        ['number', 'DESC']
                    ]
                })
                if(queueRoom){
                    element.number = queueRoom.number + 1;
                    await QueueModel.create(element, {transaction: transaction})
                } else {
                    element.number = 1
                    await QueueModel.create(element, {transaction: transaction})
                }
            }


            // if (!insert) {
            //     var has = await QueueModel.findOne({
            //         where: {
            //             status: { [Op.not]: 'complate' },
            //             room_id: element.room_id,
            //             patient_id: element.patient_id
            //         }
            //     });
            //     if (has != null) {
            //         if (element.status != has.status) {
            //             has.status = element.status;
            //             await has.save();
            //         }
            //     } else if (element.status != 'complate') {
            //         var que = await QueueModel.findOne({
            //             where: {
            //                 room_id: element.room_id,
            //             },
            //             order: [
            //                 ['number', 'DESC']
            //             ],
            //         });
            //         if (que != null) {
            //             element.number = que.number + 1;
            //         } else {
            //             element.number = 1;
            //         }
            //         await QueueModel.create(element, {transaction: transaction});
            //     }
            // } else {
            //     var que = await QueueModel.findOne({
            //         where: {
            //             room_id: element.room_id,
            //         },
            //         order: [
            //             ['number', 'DESC']
            //         ],
            //     });
            //     if (que != null) {
            //         element.number = que.number + 1;
            //     } else {
            //         element.number = 1;
            //     }
            //     await QueueModel.create(element, {transaction: transaction});

            // }
        }
        this.q = [];
    }
    #deletedoctor = async (doc_id, transaction) => {
        await Registration_doctorModel.destroy({ 
            where: { registration_id: doc_id },
            transaction: transaction
        })
        await Registration_recipeModel.destroy({
            where: { registration_id: doc_id },
            transaction: transaction
        })
        await reg_doctor_categoryModel.destroy({
            where: {
                reg_id: doc_id
            },
            transaction: transaction
        })
    }
    #deletedoctorReg = async (key, transaction) => {

        let data = await Registration_doctorModel.findOne({
            where: {key: key}
        })
        if(data){
            await Registration_doctorModel.destroy({
                where: { key: key },
                transaction: transaction
            })
            await Registration_recipeModel.destroy({ 
                where: { registration_doctor_id: data.id },
                transaction: transaction
            })
            await reg_doctor_categoryModel.destroy({
                where: {
                    doctor_id: data.id
                },
                transaction: transaction
            })
        }
    }
    #deleteCategory = async (doc_id, transaction) => {
        await reg_doctor_categoryModel.destroy({ 
            where: { doctor_id: doc_id },
            transaction: transaction
         })
    }
    #deleteSurgeryDoctor = async (parent_id, transaction) => {
        await surgery_doctorModel.destroy({ 
            where: { parent_id: parent_id },
            transaction: transaction
        })
    }
    #registerSurgeryDelete = async (id, transaction) => {
        await register_surgeryModel.destroy({
            where: {
                doc_id: id,
                place: 'Registration'
            },
            transaction: transaction
        })
    }
    #deleteSurgery = async (doc_id, transaction) => {
        try {
            const surgs = await surgery_registrationModel.findAll({
                where: {
                    registration_id: doc_id
                }
            })
            for (let index = 0; index < surgs.length; index++) {
                const element = surgs[index];
                await this.#deleteSurgeryDoctor(element.id, transaction)
            }
            await this.#registerSurgeryDelete(doc_id, transaction)
            await surgery_registrationModel.destroy({ 
                where: { registration_id: doc_id },
                transaction: transaction 
            })
            await register_surgerycategoryModel.destroy({
                where: {
                    doc_id: doc_id,
                    place: 'Registration operatsiya'
                },
                transaction: transaction
            })
        } catch (error) {
            console.log("ERROR STACK", error.stack)
        }

    }
    #deleteTashxis = async (doc_id, transaction) => {
        await Register_mkb.destroy({ 
            where: { registration_id: doc_id },
            transaction: transaction
        })
    }
    #deleteDoctor = async (doc_id, transaction) => {
        await RegisterDoctorModel.destroy({
            where: {
                doc_id: doc_id,
                place: 'Registration'
            },
            transaction: transaction
        })
    }
    #deleteIns = async (doc_id, transaction) => {
        await registerUserModel.destroy({ 
            where: { doc_id: doc_id, place: 'Registration inspection' },
            transaction: transaction
        })
        await Register_inspectionModel.destroy({
            where: {
                doc_id: doc_id,
                place: 'Registration'
            },
            transaction: transaction
        })
    }
    #medDelete = async (id) => {
        await registerMedDirectModel.destroy({
            where: {
                doc_id: id,
                place: 'Registration'
            },
            transaction: transaction
        })
    }
    #deleteKassa = async (doc_id, transaction) => {
        await Register_kassaModel.destroy({
            where: {
                doctor_id: doc_id,
                place: 'registration'
            },
            transaction: transaction
        })
    }
    #deleteDirect = async (id, transaction) => {
        await registerDirectModel.destroy({
            where: {
                doc_id: id,
                place: 'Registration'
            },
            transaction: transaction
        })
    }
    #deleteRecipe = async (doc_id, transaction) => {
        await Registration_recipeModel.destroy({ 
            where: { registration_id: doc_id },
            transaction: transaction
         })
    }
    #deleteInspection = async (doc_id) => {
        await Registration_inspectionModel.destroy({
            where: { registration_id: doc_id }
        })
        await Registration_inspection_childModel.destroy({
            where: { registration_id: doc_id }
        })
        await InspectionReagentCalcModel.destroy({
            where: { inspection_id:doc_id }
        })
    }
    #deleteInspectionReg = async (key, transaction) => {
        let data = await Registration_inspectionModel.findOne({
            where: { key: key }
        })
        if(data){
            await Registration_inspectionModel.destroy({
                where: { key: key },
                transaction: transaction
            })
            await Registration_inspection_childModel.destroy({
                where: { parent_id: data.id },
                transaction: transaction
            })
            await InspectionReagentCalcModel.destroy({
                where: { parent_id: data.id },
                // transaction: transaction
            })
            await register_reagentModel.destroy({
                where: {
                    reg_inspection_key: key,
                    doc_type: docTypes.auto_rasxod_reagent
                },
                transaction: transaction
            })
        }

    }
    #deletePalata = async (doc_id, transaction) => {
        await register_palataModel.destroy({
            where: {
                registration_id: doc_id
            },
            transaction: transaction
        })
        await register_doctorModel.destroy({
            where: {
                doc_id: doc_id,
                place: "Registration palata"
            },
            transaction: transaction
        })
        await registration_palataModel.destroy({
            where: { registration_id: doc_id },
            transaction: transaction
        })
    }
    #deletepay = async (doc_id, transaction) => {
        await Registration_payModel.destroy({ 
            where: { registration_id: doc_id },
            transaction: transaction
        })
    }
    #deleteFiles = async (doc_id) => {
        await Registration_filesModel.destroy({ where: { registration_id: doc_id } })
    }
    palata = async (req, res, next) => {
        let query = {}, query_begin = {}, query_end = {}, body = req.body;
        let data1 = body.date_to;
        let data2 = body.date_do;
        query.date_time = {
            [Op.gte]: body.date_to,
            [Op.lte]: body.date_do,
        }
        query_begin.date_time = {
            [Op.lte]: body.date_to
        }
        query_end.date_time = {
            [Op.lte]: body.date_do
        }
        let results = await palata_categoryModel.findAll({
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
                                'price'
                            ],
                            include: [
                                {
                                    model: registration_palataModel,
                                    as: 'palatas',
                                    required: false,
                                    attributes: ['id', 'date_time', 'date_do', 'palata_id', 'total_price', 'comment', 'user_id'],
                                    where: {
                                        date_to: {
                                            [Op.gte]: body.date_to,
                                        },
                                        date_do: {
                                            [Op.lte]: body.date_do
                                        }
                                    }
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
            for (let ind1 = 0; ind1 < el.xona.length; ind1++) {
                const el1 = el.xona[ind1];
                for (let ind2 = 0; ind2 < el1.palata.length; ind2++) {
                    let el2 = el1.palata[ind2];
                    if (el2.palatas.length > 0) {
                        el2.palatas.forEach((item) => {
                            if (item.dataValues.date_do >= data1 &&
                                item.dataValues.date_do >= data2
                            ) {
                                el2.status = true;
                            }
                            else if (item.dataValues.date_do >= data1 && item.dataValues.date_time <= data2) {
                                el2.status = true;
                            }
                            else if (item.dataValues.date_do <= data1 && item.dataValues.date_time <= data2) {
                                el2.status = false;
                            } else {
                                el2.status = false;
                            }
                        })
                        el2.comment = el2.palatas[0].comment
                        el2.user_id = el2.palatas[0].user_id
                    } else {
                        el2.status = false;
                    }
                }
            }
        }
        res.send(results);
    }

    search = async (req, res, next) => {
        let ModelList = await PatientModel.findAll({
            where: {
                [Op.or]: [
                    {
                        fullname: { [Op.like]: '%' + req.body.name + '%' }
                    },
                    {
                        patient_id: { [Op.like]: '%' + req.body.name + '%' }
                    }
                ]
            },
            order: [
                ['name', 'ASC'],
                ['id', 'ASC']
            ],
            limit: 100
        });
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Product list filial:02 Феендо махсулотлари",
            data: ModelList
        });
    };

    searchs = async (req, res, next) => {
        let data = req.body.name
        let x = Number(req.body.name)
        let query = {};
        if(x >= 0){
            query = { id: { [Op.like]: '%' + x + '%' } }
        } else {
            query = { fullname: { [Op.like]: '%' + data + '%' } }
        }
        let ModelList = await ModelModel.findAll({
            include: [
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },

                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    // include: [
                    //     {
                    //         model: Registration_recipeModel, as: 'registration_recipe',
                    //         include: [
                    //             { model: PillModel, as: 'pill' }
                    //         ]
                    //     }
                    // ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                },
                {
                    model: PatientModel, as: 'patient', 
                    where: query,
                    // {
                    //     // fullname:{  [Op.like]: '%'+req.body.name+'%'}

                    //     [Op.or]: [
                    //         {
                    //             fullname: { [Op.like]: '%' + req.body.name + '%' }
                    //         },
                    //         {
                    //             id: { [Op.like]: '%' + req.body.name + '%' }
                    //         }
                    //     ]
                    // }
                },
                // {
                //     model: UserModel, as: 'user', attributes: ['user_name']
                // },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    // include: [
                    //     {
                    //         model: Registration_inspection_childModel, as: 'registration_inspection_child'
                    //     }
                    // ]
                }
            ],
            order: [
                ['id', 'DESC']
            ],
            limit: 100
        });

        if (req.body.name.length == 0) {
            let model = await ModelModel.findAll({
                include: [
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
                    },

                    {
                        model: Registration_doctorModel, as: 'registration_doctor',
                    },
                    {
                        model: Registration_inspectionModel, as: 'registration_inspection',
                    },
                    { model: PatientModel, as: 'patient' }
                ],
                order: [
                    ['id', 'DESC']
                ],
                limit: 200
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: model
            });
        }
        else {
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: ModelList
            });
        }

    };
    bemor = async (req, res, next) => {
        let data = req.body.name
        let x = Number(req.body.name)
        let query = {};
        if(x >= 0){
            query = { id: { [Op.like]: '%' + x + '%' } }
        } else {
            query = { fullname: { [Op.like]: '%' + data + '%' } }
        }
        let ModelList = await PatientModel.findAll({
            where: query,
            // {
            //     [Op.or]: [
            //         { fullname: { [Op.like]: '%' + req.body.name + '%' } },
            //         { id: { [Op.like]: '%' + req.body.name + '%' } }
            //     ]
            // },
            order: [
                ['id', 'DESC']
            ],
            limit: 200
        });
        res.send(ModelList)
    };
    Imtiyozli = async (req, res, next) => {
        let bemor_id = req.body.patient_id;
        let date = Math.floor(new Date().getTime() / 1000);
        const model = await RegistrationModel.findAll({
            attributes: ['user_id', 'direct_id', 'created_at', 'updated_at', 'status', 'patient_id',
                'type_service', 'complaint', 'summa', 'pay_summa', 'backlog', 'discount', 'hospital_summa', 'tramma_type'],
            where: {
                patient_id: bemor_id
            }
        })
        if (!model) {
            throw HttpException(404, "bemor oldin kelmagan")
        }
        if (model.length != 0) {
            model.forEach(value => {
                let beshinchiKun = moment(value.created_at * 1000).day(8).format();
                let kelganKuni = moment(value.created_at * 1000).format();
                let bugungiVaqt = moment(date * 1000).format();
                let onBeshinchiKun = moment(value.created_at * 1000).day(18).format();
                let birOy = moment(value.created_at * 1000).day(31).format();
                if (beshinchiKun > bugungiVaqt && kelganKuni < bugungiVaqt) {
                    let day = "5 kun oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else if (onBeshinchiKun > bugungiVaqt && kelganKuni < bugungiVaqt) {
                    let day = "15 kun oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else if (birOy > bugungiVaqt && kelganKuni < bugungiVaqt) {
                    let day = "Bir oy oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else {
                    let day = "Bir oydan ortiq";
                    res.send({
                        "error": false,
                        "error_code": 200,
                        "message": "malumot topildi",
                        data: day
                    });
                }
            })
        }
        else {
            res.send({
                "error": false,
                "error_code": 200,
                "message": "malumot topildi",
                data: "Bir oydan ortiq"
            });
        }
    }
    // delete = async (req, res, next) => {

    //     const user = await ModelModel.findOne({
    //         where:{
    //             id: req.params.id
    //         }
    //       })
    //       if(user == null){
    //         throw new HttpException(401, "registratsiya mavjud emas")
    //       }
    //       await QueueModel.destroy({
    //         where:{
    //             patient_id: user.dataValues.patient_id
    //         }
    //       })
    //       await uplataModel.destroy({
    //         where:{
    //             user_id: user.dataValues.user_id
    //         }
    //       })
    //       await Registration_doctorModel.destroy({
    //         where:{
    //             registration_id: req.params.id
    //         }
    //        })
    //        await Registration_filesModel.destroy({
    //            where:{
    //             registration_id: req.params.id
    //            }
    //           })
    //        await Registration_inspectionModel.destroy({
    //            where:{
    //             registration_id: req.params.id
    //            }
    //           })
    //           await Registration_inspection_childModel.destroy({
    //            where:{
    //             registration_id: req.params.id
    //            }
    //           })
    //           await Register_inspectionModel.destroy({
    //             where:{
    //                 doc_id: req.params.id
    //             }
    //           })
    //           await RegisterDoctorModel.destroy({
    //             where:{
    //                 doc_id: req.params.id
    //             }
    //           })
    //           await register_mkb.destroy({
    //             where:{
    //                 registration_id: req.params.id
    //             }
    //           })
    //        await Registration_payModel.destroy({
    //            where:{
    //             registration_id: req.params.id
    //            }
    //           })
    //           await Registration_recipeModel.destroy({
    //            where:{
    //             registration_id: req.params.id
    //            }
    //           })
    //           await Register_kassaModel.destroy({
    //               where:{
    //                   doctor_id: req.params.id,
    //                   place: 'registration'
    //               }
    //           })
    //           const model =  await ModelModel.destroy({ 
    //             where:{
    //               id: req.params.id
    //             }
    //         });
    //     if(!model){
    //         throw new HttpException(404, "bunday id yoq")
    //     }
    //         // this.#deleteSurgery(req.params.id)
    //     res.status(200).send({
    //         error: false,
    //         error_code: 200,
    //         message: 'Malumot o\'chirildi',
    //         data: model
    //     });
    // }
    deleted = async (req, res, next) => {
        let models = await ModelModel.findAll();
        // let arxiv = await Registration_arxivModel.findAll();
        if (models.length > 0) {
            for (let i = 0; i <= models.length; i++) {
                if (models[i] != undefined) {
                    await QueueModel.destroy({
                        where: {
                            patient_id: models[i].dataValues.patient_id
                        }
                    })
                    await uplataModel.destroy({
                        where: {
                            user_id: models[i].dataValues.user_id
                        }
                    })
                    await PatientModel.destroy({
                        where: {
                            id: models[i].dataValues.patient_id
                        }
                    })
                    await Registration_doctorModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_filesModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_inspectionModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_inspection_childModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Register_inspectionModel.destroy({
                        where: {
                            doc_id: models[i].dataValues.id,
                            place: 'Registration'
                        }
                    })
                    await RegisterDoctorModel.destroy({
                        where: {
                            doc_id: models[i].dataValues.id,
                            [Op.or]: [
                                {
                                    place: 'Registration',
                                },
                                {
                                    place: 'Registration palata',
                                },
                                {
                                    place: 'Registration Operatsiya',
                                },
                                {
                                    place: 'Registration Operatsiya Qoshimcha',
                                },
                            ]
                        }
                    })
                    await register_mkb.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_payModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_recipeModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Register_kassaModel.destroy({
                        where: {
                            doctor_id: models[i].dataValues.id,
                            place: 'registration'
                        }
                    })
                    await ModelModel.destroy({
                        where: {
                            id: models[i].dataValues.id
                        }
                    });
                    await Registration_doctor_arxivModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_files_arxivModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_inspection_arxivModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_inspection_child_arxxivModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })

                    await Registration_pay_arxivModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                    await Registration_recipe_arxivModel.destroy({
                        where: {
                            registration_id: models[i].dataValues.id
                        }
                    })
                }
                else {
                    break;
                }
            }
        }
        else {
            throw new HttpException(401, "bazada malumot mavjud emas")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar o\'chirildi'
        });
    }
    queueAll = async (req, res, next) => {
        const model = await QueueModel.findAll({
            where: {
                status: { [Op.not]: 'complate' }
            },
            include: [
                {
                    model: RoomModel, as: 'room', attributes: ['name'],
                    include: [
                        {
                            model: UserModel, as: 'users', attributes: ['doctor_id'],
                            include: [
                                { model: DoctorModel, as: 'doctor', attributes: ['name'] }
                            ]
                        }
                    ]
                },
                { model: PatientModel, as: 'patient', attributes: ['fullname'] },
            ],
            group: ['room_id'],
            limit: 100,
            order: [
                ['number', 'ASC']
            ],
        });
        res.send({
            error_code: 200,
            error: false,
            message: "malumotlar chiqdi",
            data: model
        })

    }

    registerAll = async (req, res, next) => {
        const model = await Register_kassaModel.findAll({
            include: [
                { model: DoctorModel, as: 'doctor', attributes: ['name'] }
            ]
        });

        res.send({
            error_code: 201,
            error: false,
            message: "malumotlar chiqdi",
            data: model
        })
    }

    statsionarHisobot = async (req, res, next) => {
        let query = {};
        query.created_at = {
            [Op.gte]: req.body.datetime1,
            [Op.lte]: req.body.datetime2,
        }
        query.type_service = {
            [Op.eq]: 'Statsionar'
        }
        const model = await RegistrationModel.findAll({
            where: query,
            include: [
                { model: PatientModel, as: 'patient', attributes: ['fullname'] }
            ]
        })
        res.send({
            error_code: 201,
            error: false,
            message: "malumotlar chiqdi",
            data: model
        })
    }
    statsionar = async (req, res, next) => {
        let currentUser = req.currentUser
        let query = {};
        if (currentUser.role == 'Shifokor' || currentUser.role == 'Loborant') {
            query = {
                [Op.or]: [{ user_id: null }, { user_id: currentUser.id }], 
            }
        }
        try {
            let model = await ModelModel.findAll({
                where: {
                    type_service: "Statsionar"
                },
                include: [
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
                    },
                    {
                        model: PatientModel, as: 'patient'
                    },
                    {
                        model: registration_palataModel, as: 'registration_palata',
                        where: query,
                        include: [
                            {
                                model: palataModel,
                                as: 'palatas',
                                attributes: ['name'],
                                include: [
                                    {
                                        model: xona_etajModel,
                                        as: 'xona',
                                        required: false,
                                        // include: [
                                        //     {
                                        //         model: palata_categoryModel,
                                        //         as: 'palata_category',
                                        //         required: false
                                        //     }
                                        // ]
                                    }
                                ]
    
                            }
                        ]
                    },
                ],
                order: [
                    ['created_at', 'desc']
                ],
                limit: 500,
            })
            if (!model) {
                throw new HttpException(401, "malumot topilmadi")
            }
            res.send({
                error: false,
                error_code: 201,
                message: 'malumot topildi',
                data: model
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    statsionarPost = async (req, res, next) => {
        let currentUser = req.currentUser
        const { datetime1, datetime2, search } = req.body;
        let query = {}, queryP = {};
        if (currentUser.role == 'Shifokor') {
            query = {
                [Op.or]: [{ user_id: null }, { user_id: currentUser.doctor_id }], 
            }
        }
        if(search){
            let x = Number(search)
            if(x >= 0){
                queryP = { id: { [Op.like]: '%' + x + '%' } }
            } else {
                queryP = { fullname: { [Op.like]: '%' + search + '%' } }
            }
        } else {
            query.date_to = {
                [Op.gte]: datetime1,
                [Op.lte]: datetime2,
            }
        }
        try {
            let model = await registration_palataModel.findAll({
                where: query,
                include: [
                    {
                        model: palataModel,
                        as: 'palatas',
                        attributes: ['name'],
                        include: [
                            {
                                model: xona_etajModel,
                                as: 'xona',
                                required: false,
                            },
                        ]

                    },
                    {
                        model: PatientModel,
                        as: 'patient',
                        attributes: ['fullname', 'imtiyoz_type'],
                        where: queryP,
                        required: true
                    },
                    {
                        model: DoctorModel,
                        as: 'doctor',
                        attributes: ['name', 'id'],
                        required: false
                    }
                ],
                group: [
                    'palata_id'
                ]
            })
            if (!model) {
                throw new HttpException(401, "malumot topilmadi")
            }
            res.send({
                error: false,
                error_code: 201,
                message: 'malumot topildi',
                data: model
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    searchs_palata = async (req, res, next) => {
        let data = req.body.name
        let x = Number(req.body.name)
        let query = {};
        if(x >= 0){
            query = { id: { [Op.like]: '%' + x + '%' } }
        } else {
            query = { fullname: { [Op.like]: '%' + data + '%' } }
        }
        let ModelList = await ModelModel.findAll({
            include: [
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                },
                {
                    model: PatientModel, as: 'patient', 
                    where: query,
                },
            ],
            order: [
                ['id', 'DESC']
            ],
            limit: 100
        });

        if (req.body.name.length == 0) {
            let model = await ModelModel.findAll({
                include: [
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
                    },

                    {
                        model: Registration_doctorModel, as: 'registration_doctor',
                    },
                    {
                        model: Registration_inspectionModel, as: 'registration_inspection',
                    },
                    { model: PatientModel, as: 'patient' }
                ],
                order: [
                    ['id', 'DESC']
                ],
                limit: 200
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: model
            });
        }
        else {
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: ModelList
            });
        }

    };
}



module.exports = new RegistrationController;