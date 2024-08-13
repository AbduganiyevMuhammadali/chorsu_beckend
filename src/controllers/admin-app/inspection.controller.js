
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const inspectionModel = require('../../models/inspection.model');
const inspectionChildModel = require('../../models/inspectionChild.model');
const UserModel = require('../../models/user.model');
const inspector_categoryModel = require('../../models/inspector_category.model');
const InspectionReagentCalcModel = require('../../models/inspection_reagent_calc.model')
const { Sequelize, Op } = require('sequelize');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class InspectionController {
    getAll = async (req, res, next) => {
        const model = await inspectionModel.findAll({
            include:[
                {model: UserModel, as: 'User', attributes: ['id', "user_name"]},
                {
                    model: inspectionChildModel, as: 'inspectionChild', 
                    attributes:['id', 'norm', 'parent_id','price', 'name', 'file', 'citizen_price'],
                },
                {model: inspector_categoryModel, as: 'inspector_category'}
            ],
            order: [
                [
                    'id', 'ASC'
                ],
                [
                    {
                        model: inspectionChildModel,
                        as: 'inspectionChild',
                    },
                    'id',
                    'ASC'
                ]
            ],

        });
        res.status(200).send({
            error: false,
            error_code: 200, 
            message: 'Malumotlar chiqdi',
            data: model
        });
        // client.setex('inspection', 3600, JSON.stringify(model))
    }
    tekshiruvUzi = async(req,res,next) => {
        let body = req.body;
        if(body.uzi == true){
            const model = await inspectionModel.findAll({
                attributes: ['id','name','price','citizen_price','type','user_id','category_id','select','uzi','shablon',
                 [Sequelize.literal('inspector_category.name'), 'category_name']],
                include:[
                    {model: UserModel, as: 'User', attributes: ['id', "user_name"]},
                    {model: inspector_categoryModel, as: 'inspector_category', attributes: []},
                    {
                        model: inspectionChildModel, 
                        as: 'inspectionChild',
                        order: [
                            ['id', 'asc']
                        ]
                    }
                ],
                where:{
                    uzi: 1
                }
            })
            res.send(model) 
        }
        else{
            const model = await inspectionModel.findAll({
                attributes: ['id','name','price','citizen_price','type','user_id','category_id','select','uzi','shablon',
                 [Sequelize.literal('inspector_category.name'), 'category_name']],
                include:[
                    {model: inspector_categoryModel, as: 'inspector_category', attributes: []},
                    {model: inspectionChildModel, as: 'inspectionChild'}
                ],
                where:{
                    [Op.or]: [
                        {uzi: 0},
                        {uzi: null}
                    ]
                }
            })
            res.send(model)
        }
    }
    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await inspectionModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: inspectionChildModel, 
                    as: 'inspectionChild',
                    required: false,
                    include: [
                        {
                            model: InspectionReagentCalcModel,
                            as: 'reagents',
                            required: false
                        }
                    ]
                }
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.send(model)
        // client.setex('inspectionOne', 3600, JSON.stringify(model))
    }
    #addInspectionChild = async (model, items, insert = false) => {
        if(!insert) {

            await inspectionChildModel.destroy({
                where: {
                    parent_id: model.id
                },
            })

            await InspectionReagentCalcModel.destroy({
                where: {
                    inspection_id: model.id
                }
            })
        }
        for (let index = 0; index < items.length; index++) {
            let el = items[index];
            const child = await inspectionChildModel.create({
                norm: el.norm,
                parent_id: model.id,
                price: el.price,
                citizen_price: el.citizen_price,
                name: el.name,
                file: el.file,
            })
            for (let i = 0; i < el.reagents.length; i++) {
                const el1 = el.reagents[i];
                await InspectionReagentCalcModel.create({
                    inspection_id: model.id,
                    inspection_child_id: child.id,
                    reagent_id: el1.reagent_id,
                    count: el1.count,
                    price:el1.price,
                    
                })
            }
        }

    }
    create = async (req, res, next) => {
       this.checkValidation(req);
       const {inspectionChild, ...inspection} = req.body;
       const model = await inspectionModel.create(inspection);
       await this.#addInspectionChild(model, inspectionChild, true)

       res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: model
        });
    }
    update = async (req, res, next) => {
        const { inspectionChild, ...inspection } = req.body;
        const model = await inspectionModel.findOne({
            where:{
               id: req.params.id
            }
        })
        if(model === null){ 
            res.status(404).send("model mavjud emas")
        }
        if(model === null){
            res.status(404).send("not found")
        }
        model.name = inspection.name;
        model.parent_id = inspection.parent_id;
        model.price = inspection.price;
        model.type = inspection.type;
        model.user_id = inspection.user_id;
        model.category_id = inspection.category_id;
        model.percent_bonus = inspection.percent_bonus;
        model.citizen_price = inspection.citizen_price;
        model.uzi = inspection.uzi;
        model.shablon = inspection.shablon;
        model.save();
        await this.#addInspectionChild(model, inspectionChild);

        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) => {
    const model = await inspectionModel.destroy({
            where:{
            id: req.params.id
            }
        });

        await inspectionChildModel.destroy({
            where: {
                parent_id: req.params.id
            }
        })

        await InspectionReagentCalcModel.destroy({
            where: {
                inspection_id:  req.params.id
            }
        })

        if(!model){
            throw new HttpException(404, "bunday id yoq")
        }

        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar o\'chirildi',
            data: model
        });
    }
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new InspectionController;