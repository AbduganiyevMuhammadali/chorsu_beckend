
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const PenaltyBonusModel = require('../../models/penaltyBonus.model')
const { validationResult } = require('express-validator');
const { sequelize } = require('../../models/reagent.model');
const {Op} = require('sequelize')
const config = require('../../startup/config');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class PenaltyBonusController {
   
    getAll = async (req, res, next) => {
        const model = await PenaltyBonusModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        const model = await PenaltyBonusModel.findOne({
            where:{
                id: req.params.id
            }
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
       const model = await PenaltyBonusModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
        const model = await PenaltyBonusModel.findOne({
            where:{
                id: req.params.id
            }
        });

        model.min_time = req.body.min_time;
        model.max_time = req.body.max_time;
        model.cause = req.body.cause;
        model.type = req.body.type;
        model.summa = req.body.summa;

        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
}
delete = async (req, res, next) => {
  const model = await PenaltyBonusModel.destroy({
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
module.exports = new PenaltyBonusController;