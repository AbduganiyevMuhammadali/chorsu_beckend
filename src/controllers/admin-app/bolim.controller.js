
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const bolimModel = require('../../models/bolim.model')
const { validationResult } = require('express-validator');
const { sequelize } = require('../../models/reagent.model');
const {Op} = require('sequelize')
const config = require('../../startup/config');
const mysqldump = require('mysqldump')

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class bolimController {
    dumper = async (req, res) => {
        try {
            const unique = new Date().getTime()
            const result = await mysqldump({
                connection: {
                    host: config.host,
                    user: config.db_user,
                    password: config.db_pass,
                    database: config.db_name,
                },
                dumpToFile: `./backups/${unique}_dump.sql`,
                compressFile: false,
            });
            res.send({
                message: "Baza arxivlandi!",
                name: `${unique}_dump.sql`,
            })
        } catch (error) {
            throw new HttpException(500)
        }
    }
    getAll = async (req, res, next) => {
        const model = await bolimModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await bolimModel.findOne({
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
       const model = await bolimModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await bolimModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.direct_precent = req.body.direct_precent;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await bolimModel.destroy({
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
module.exports = new bolimController;