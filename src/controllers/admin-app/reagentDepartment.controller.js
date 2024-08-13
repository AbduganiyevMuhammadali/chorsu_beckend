
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const reagentDepartmentModel = require('../../models/reagent_department.model')
const { validationResult } = require('express-validator');
const reagentModel = require('../../models/reagent.model');
const BolimModel = require('../../models/bolim.model');
const register_reagentModel = require('../../models/register_reagent.model');
const sequelize = require('../../db/db-sequelize')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class reagentDepartmentController {
    getAll = async (req, res, next) => {
        const model = await reagentDepartmentModel.findAll({
            include:[
                {model: reagentModel, as: 'reagent'},
                {model: BolimModel, as: 'bolim'}
            ]
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await reagentDepartmentModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: reagentModel, as: 'reagent'},
                {model: BolimModel, as: 'bolim'}
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const t = await sequelize.transaction()
       try {
            const model = await reagentDepartmentModel.create(req.body, {
                transaction: t
            });
            const availables = await register_reagentModel.findAll({
                attributes: [
                    'price',
                    'reagent_id',
                    [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' THEN `count` WHEN `doc_type` = 'Chiqim' THEN -`count` ELSE 0 END)"), 'all_count'],
                ],
                group: ['reagent_id', 'price'],
                order: [
                    ['all_count', 'DESC']
                ]
            })
            console.log(availables)
            let bulkReg = [];
            let count = Number(req.body.count);
            for (let index = 0; index < availables.length; index++) {
                const element = availables[index];
                if(count <= 0) {
                    break;
                }
                if(element.getDataValue('all_count') > 0 && req.body.reagent_id == element.reagent_id) {
                    if(element.getDataValue('all_count') >= count) {
                        bulkReg.push({
                            reagent_id: element.reagent_id,
                            date_time: Math.floor(new Date().getTime() / 1000),
                            price: element.price,
                            count: count,
                            summa: element.price * count,
                            doc_id: model.id,
                            doc_type: 'Chiqim'
                        })
                        count = 0;
                    } else {
                        bulkReg.push({
                            reagent_id: element.reagent_id,
                            date_time: Math.floor(new Date().getTime() / 1000),
                            price: element.price,
                            count: element.all_count,
                            summa: element.price * element.getDataValue('all_count'),
                            doc_id: model.id,
                            doc_type: 'Chiqim'
                        })
                        count -= element.getDataValue('all_count') ;
                    }
                }
                
            }
            if (count > 0) {
                throw new HttpException(500, "Qoldiq yetarli emas!")
            }
            await register_reagentModel.bulkCreate(bulkReg, {
                transaction: t
            })
            t.commit()
            res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: model
        });
       } catch(err) {
            t.rollback()
            throw new HttpException(500, err)
       }
       
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
        const t = await sequelize.transaction()
    try {
        const model = await reagentDepartmentModel.findOne({
            where:{
                id: req.params.id
            },
            transaction: t
        });
        model.department_id = req.body.department_id;
        model.reagent_id = req.body.reagent_id;
        model.count = req.body.count;
        model.save();
        await register_reagentModel.destroy({
            where: {
                doc_id: model.id,
                doc_type: 'Chiqim'
            }
        })
        const availables = await register_reagentModel.findAll({
            attributes: [
                'price',
                'reagent_id',
                [sequelize.literal("SUM(CASE WHEN `doc_type` = 'kirim' THEN `count` WHEN `doc_type` = 'Chiqim' THEN -`count` ELSE 0 END)"), 'all_count'],
            ],
            group: ['reagent_id', 'price'],
            order: [
                ['all_count', 'DESC']
            ]
        })
        let bulkReg = [];
        let count = Number(req.body.count);
        for (let index = 0; index < availables.length; index++) {
            const element = availables[index];
            if(count <= 0) {
                break;
            }
            if(element.getDataValue('all_count') > 0 && req.body.reagent_id == element.reagent_id) {
                if(element.getDataValue('all_count') >= count) {
                    bulkReg.push({
                        reagent_id: element.reagent_id,
                        date_time: Math.floor(new Date().getTime() / 1000),
                        price: element.price,
                        count: count,
                        summa: element.price * count,
                        doc_id: model.id,
                        doc_type: 'Chiqim'
                    })
                    count = 0;
                } else {
                    bulkReg.push({
                        reagent_id: element.reagent_id,
                        date_time: Math.floor(new Date().getTime() / 1000),
                        price: element.price,
                        count: element.all_count,
                        summa: element.price * element.getDataValue('all_count'),
                        doc_id: model.id,
                        doc_type: 'Chiqim'
                    })
                    count -= element.getDataValue('all_count') ;
                }
            }
            
        }
        if (count > 0) {
            throw new HttpException(500, "Qoldiq yetarli emas!")
        }
        await register_reagentModel.bulkCreate(bulkReg, {
            transaction: t
        })
        t.commit()
        res.send({
            error: false,
            error_code: 200,
            message: 'Malumotlar taxrirlandi!',
            data: model
        });
    } catch(err) {
        t.rollback()
        throw new HttpException(500, err)
    }
}
delete = async (req, res, next) => {
  const model = await reagentDepartmentModel.destroy({
        where:{
          id: req.params.id
        }
    });
    if(!model){
        throw new HttpException(404, "bunday id yoq")
    }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot o\'chirildi',
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
module.exports = new reagentDepartmentController;