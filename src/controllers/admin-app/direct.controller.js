
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const directModel = require('../../models/direct.model')
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const med_directModel = require('../../models/med_direct.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class directController {
    getAll = async (req, res, next) => {
        const model = await directModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    search = async(req,res,next) => {
        let model = await directModel.findAll({
            where:{
                [Op.or]: [
                    { name:{  [Op.like]: '%'+req.body.name+'%'} },
                    { id: req.body.direct_id }
                  ]
            },
            include:[
                {model: med_directModel, as: 'med_direct'}
            ]
        })
        res.send(model)
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await directModel.findOne({
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
       const model = await directModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await directModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.bonus = req.body.bonus;
    model.bonus_type = req.body.bonus_type;
    model.med_id = req.body.med_id;
    model.direct_id = req.body.direct_id;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await directModel.destroy({
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
module.exports = new directController;