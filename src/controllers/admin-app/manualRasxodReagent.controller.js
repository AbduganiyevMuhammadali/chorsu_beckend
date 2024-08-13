
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const ManualRasxodReagentModel = require('../../models/manual_rasxod_reagent.model');
const UserModel = require('../../models/user.model');
const ManualRasxodReagentChildModel = require('../../models/manual_rasxod_reagent_child.model');
const register_reagentModel = require('../../models/register_reagent.model');
const docType = require('../../utils/docType.utils');
const sequelize = require('../../db/db-sequelize');
const { QueryTypes } = require('sequelize')
/******************************************************************************
 *                              Manual Rasxod Controller
 ******************************************************************************/
class ManualRasxodReagentController {
    getBalanceReagent = async (req, res, next) => {
        const { id } = req.params;
        const model = await register_reagentModel.findOne({
            attributes: [
                [sequelize.literal("SUM(count * power(-1, `type` + 1))"), 'balance']
            ],
            where: {
                reagent_id: id
            }
        })
        res.send(model)
    }
    getAll = async (req, res, next) => {
        const modelList = await ManualRasxodReagentModel.findAll({ 
            include:[
                {
                    model: UserModel,
                    as: 'user'
                }
            ]
        }); 
        res.send(modelList)
    }

    getOne = async (req, res, next) => {
        const model = await ManualRasxodReagentModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: ManualRasxodReagentChildModel,
                    as: 'childs',
                    require: false
                }
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.send(model)
    }

   create = async (req, res, next) => {
       let {
        datetime,
        ins_cat_id,
        all_count,
        childs
       } = req.body;
       const userId = req.currentUser.id;
       const model = await ManualRasxodReagentModel.create({
            datetime:  datetime,
            user_id: userId,
            ins_cat_id: ins_cat_id,
            all_count: all_count,
       });
       
       await this.#add(model, childs);

       res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qoshildi',
            data: model
        });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
        const model = await ManualRasxodReagentModel.findOne({
            where:{
                id: req.params.id
            }
        });
        if (!model) {
            throw new HttpException(404, "Ma'lumot topilmadi!")
        }
        let { all_count, childs } = req.body;
        const userId = req.currentUser.id;
        model.userId = userId;
        model.all_count = all_count;
        await this.#add(model, childs, false);
        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    
    #add = async(model, childs, insert = true) => {
        if (!insert) {
            await this.#deleteReletions(model.id)
        }

        for (const item of childs) {
            
            await ManualRasxodReagentChildModel.create({
                parent_id: model.id,
                reagent_id: item.reagent_id,
                ins_cat_id: model.ins_cat_id,
                count: item.count,
                balance: item.balance
            })
            
            let query = "SELECT `s`.`date_time`, `s`.`price`, `reg`.`reagent_id`, `reg`.`sereis_id`, \
                SUM(CASE WHEN `reg`.`type` = 1 THEN `reg`.`count` \
                WHEN `reg`.`type` = 0 THEN -`reg`.`count` ELSE 0 END) as `ost` \
                from `register_reagent` as `reg` LEFT JOIN `sereis` as `s` ON `reg`.`sereis_id` = `s`.`id` \
                WHERE `reg`.`reagent_id` = " + item.reagent_id + " \
                GROUP BY `reg`.`sereis_id` HAVING `ost` > 0 ORDER BY `s`.`date_time` ASC"
            
            let osts = null;
            
            if(query){
                osts = await sequelize.query(
                    query, 
                    {
                        type: QueryTypes.SELECT,
                        nest: true,
                    }
                );
            }
            let tempCount = item.count;
            let bulkReagentReg = [];
            
            for (let ost of osts) {
                if (tempCount >= ost.ost && ost.ost > 0) {
                    tempCount -= ost.ost;
                    bulkReagentReg.push({
                        reagent_id: item.reagent_id,
                        date_time: model.datetime,
                        price: ost.price,
                        count: ost.ost,
                        summa: ost.price * ost.ost,
                        doc_id: model.id,
                        doc_type: docType.manual_rasxod_reagent,
                        type: 0,
                        sereis_id: ost.sereis_id,
                        ins_cat_id: model.ins_cat_id
                    })
                    ost.ost = 0;
                } else {
                    bulkReagentReg.push({
                        reagent_id: item.reagent_id,
                        date_time: model.datetime,
                        price: ost.price,
                        count: tempCount,
                        summa: ost.price * tempCount,
                        doc_id: model.id,
                        doc_type: docType.manual_rasxod_reagent,
                        type: 0,
                        sereis_id: ost.sereis_id,
                        ins_cat_id: model.ins_cat_id,
                    })
                    tempCount = 0
                }
            }
            await register_reagentModel.bulkCreate(bulkReagentReg);
        }

    }

    #deleteReletions = async(id) => {
        await register_reagentModel.destroy({
            where: {
                doc_type: docType.manual_rasxod_reagent,
                doc_id: id,
            }
        })
        await ManualRasxodReagentChildModel.destroy({
            where: {
                parent_id: id,
            }
        })
    }

    delete = async (req, res, next) => {
        
        const model = await ManualRasxodReagentModel.destroy({
            where:{
                id: req.params.id
            }
        });

        await this.#deleteReletions(req.params.id)

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
module.exports = new ManualRasxodReagentController;