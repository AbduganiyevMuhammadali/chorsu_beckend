
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const prixod_Model = require('../../models/prixod.model')
const { validationResult } = require('express-validator');
const prixod_tableModel = require('../../models/prixod_table.model');
const reagentModel = require('../../models/reagent.model');
const register_supplierModel = require("../../models/register_supplier.model");
const register_reagentModel = require('../../models/register_reagent.model');
const pastavchikModel = require('../../models/pastavchik.model');
const SereisModel = require('../../models/sereis.model')
const { QueryTypes } = require('sequelize');
const db = require('../../db/db-sequelize')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class prixodController {
    getAll = async (req, res, next) => {
        const model = await prixod_Model.findAll({
            include:[
                {model: prixod_tableModel, as: 'prixod_table',
            include:[
                {model: reagentModel, as: 'reagent'}
            ]
            },
            {model: pastavchikModel, as: 'pastavchik'}
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
        const model = await prixod_Model.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: prixod_tableModel, as: 'prixod_table',
            include:[
                {model: reagentModel, as: 'reagent'}
            ]
            },
            {model: pastavchikModel, as: 'pastavchik'}
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        model.dataValues.date_time = String(model.dataValues.date_time);
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
    create =  async(req, res, next) => {
        this.checkValidation(req);
        const {prixod_table, ...data} = req.body;
        const model = await prixod_Model.create({
                "date_time": Math.floor(new Date().getTime() / 1000),
                "pastavchik_id": req.body.pastavchik_id,
                "umumiy_summa": req.body.umumiy_summa,
                "comment": req.body.comment
        });
        this.#prixod_table(model, prixod_table);
        var register = {
            "date_time": Math.floor(new Date().getTime() / 1000),
            "doc_id": model.id,
            "summa": model.umumiy_summa,
            "doc_type": "Chiqim",
            "type": 0,
            "place": "Prixod",
            "pastavchik_id": model.pastavchik_id
        }
        await register_supplierModel.create(register);
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: model
        });
    }
    update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await prixod_Model.findOne({
        where:{
            id: req.params.id
        }
    });
    
    // series = await findOrCreateSeries(
    //     model.created_at, element.product_id, model.sklad_id, 
    //     element.kontragent_price, element_debit_price, element.optom_price, element.chakana_price, 
    //     doc_id, DocType.kirim, element.chakana_dollar_price, 
    //     element.optom_dollar_price, price_type, model.kontragent_id);
    const {prixod_table, ...data } = req.body;
    // model.date_time = req.body.date_time;
    model.pastavchik_id = req.body.pastavchik_id;
    model.umumiy_summa = req.body.umumiy_summa;
    model.comment = req.body.comment;
    model.save();
    this.#prixod_table(model, prixod_table, false);
    await register_supplierModel.destroy({
        where:{
            doc_id: model.id,
            place: 'Prixod'
        }
    })
    var register = {
        "date_time": model.date_time,
        "doc_id": model.id,
        "summa": model.umumiy_summa,
        "doc_type": "Chiqim",
        "type": 0,
        "place": "Prixod",
        "pastavchik_id": model.pastavchik_id
      }
      await register_supplierModel.create(register);
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
    }
    #prixod_table = async(model, prixod_table, insert = true) => {
        if(!insert){
        await this.#deletePrixodTable(model.id)
        await this.#deleteRegister_reagent(model.id)
        }
        for(let key of prixod_table){
            var tables = {
                "datetime": model.date_time,
                "reagent_id": key.reagent_id,
                "price": key.price,
                "prixod_id": model.id,
                "count": key.count,
                "summa": key.summa,
                "type":1
            }
            await prixod_tableModel.create(tables);
            const series = await this.findOrCreateSeries(model.date_time, key.reagent_id, key.price);
            var reagent = {
                "reagent_id": key.reagent_id,
                "price": key.price,
                "doc_id": model.id,
                "count": key.count,
                "summa": key.summa,
                "type": 1,
                "sereis_id": series.id,
                "date_time": model.date_time,
                "doc_type": "kirim"
            }
            await register_reagentModel.create(reagent);
        }
    }
    findOrCreateSeries = async (date_time, reagent_id, price) => {
        
        let [model, new_model] =  await SereisModel.findOrCreate({
            where: {
                date_time: date_time,
                reagent_id: reagent_id, 
                price: price
            }
        });

        return model;
    }
    #deletePrixodTable = async(doc_id) =>{
    await prixod_tableModel.destroy(
            {where:{prixod_id: doc_id}}
        )
    }
    #deleteRegister_reagent = async(id) => {
        await register_reagentModel.destroy({where: {
            doc_id: id,
            doc_type: 'kirim'
        }})
    }
    delete = async (req, res, next) => {
        const model = await prixod_Model.destroy({
                where:{
                    id: req.params.id
                }
        });
        await this.#deletePrixodTable(req.params.id)
        await this.#deleteRegister_reagent(req.params.id)

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
    // reagent All
    getReagent = async (req, res, next) => {
        const model = await db.query('SELECT `R`.`id`, `R`.`name`,  SUM(CASE WHEN `RR`.`type` = 1 THEN `RR`.`count` ELSE -`RR`.`count` END) AS `count`, SUM(CASE WHEN `RR`.`type` = 1 THEN `RR`.`summa` ELSE -`RR`.`summa` END) AS `summa` FROM `register_reagent` `RR` LEFT JOIN `reagent` `R` ON `RR`.`reagent_id`=`R`.`id` GROUP BY `RR`.`reagent_id`' , {raw: true, type: QueryTypes.SELECT })
        res.status(200).send({
            // .`qoldiq` <= `product`.`minimal`
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new prixodController;