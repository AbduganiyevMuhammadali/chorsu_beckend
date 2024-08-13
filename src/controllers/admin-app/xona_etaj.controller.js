
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const palata_categoryModel = require('../../models/palata_category.model')
const xona_etajModel = require('../../models/xona_etaj.model');
const palataModel = require('../../models/palata.model');
const { validationResult } = require('express-validator');
const { sequelize } = require('../../models/reagent.model');
const {Op} = require('sequelize')

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class xona_etajController {
    getAll = async (req, res, next) => {
        const model = await xona_etajModel.findAll({
            include: [
                { model: palata_categoryModel, as: 'palata_category' }
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
        const model = await xona_etajModel.findOne({
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
    getByIdPalata = async (req, res, next) => {
        const result = await palataModel.findAll({
            where: {
                room_id: req.params.id
            }
        })
        res.send(result)
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await xona_etajModel.create({
        'name': req.body.name,
        'category_id': req.body.category_id,
       });
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await xona_etajModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.category_id = req.body.category_id;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await xona_etajModel.destroy({
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
module.exports = new xona_etajController;