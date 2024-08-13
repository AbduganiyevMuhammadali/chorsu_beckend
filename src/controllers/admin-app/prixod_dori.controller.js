
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const prixod_dori_Model = require('../../models/prixod_dori.model')
const { validationResult } = require('express-validator');
const dori_prixod_tableModel = require('../../models/prixod_dori_table.model');
const doriModel = require('../../models/pill.model');
const register_supplierModel = require("../../models/register_supplier.model");
const register_doriModel = require('../../models/register_dori.model');
const pastavchikModel = require('../../models/pastavchik.model');
const DoriSeriesModel = require('../../models/dori_series.model')
const { QueryTypes } = require('sequelize');
const db = require('../../db/db-sequelize')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class prixod_doriController {
    getAll = async (req, res, next) => {
        const model = await prixod_dori_Model.findAll({
            include:[
                {model: dori_prixod_tableModel, as: 'dori_prixod_table',
            include:[
                {model: doriModel, as: 'pill'}
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
        console.log("OKKK", req.params)
        const model = await prixod_dori_Model.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: dori_prixod_tableModel, 
                    as: 'dori_prixod_table',
                    required: false,
                    include:[
                        {
                            model: doriModel, 
                            as: 'pill',
                            required: false
                        }
                    ]
                },
                {
                    model: pastavchikModel, 
                    as: 'pastavchik',
                    required: false
                }
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

       const {dori_prixod_table, ...data} = req.body;
       const model = await prixod_dori_Model.create({
            "date_time": Math.floor(new Date().getTime() / 1000),
            "pastavchik_id": req.body.pastavchik_id,
            "umumiy_summa": req.body.umumiy_summa,
            "comment": req.body.comment
       });
       this.#dori_prixod_table(model, dori_prixod_table);
       var register = {
         "date_time": Math.floor(new Date().getTime() / 1000),
         "doc_id": model.id,
         "summa": model.umumiy_summa,
         "doc_type": "Chiqim",
         "type": 0,
         "place": "Prixod_dori",
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
    const model = await prixod_dori_Model.findOne({
        where:{
            id: req.params.id
        }
    });
    
    // series = await findOrCreateSeries(
    //     model.created_at, element.product_id, model.sklad_id, 
    //     element.kontragent_price, element_debit_price, element.optom_price, element.chakana_price, 
    //     doc_id, DocType.kirim, element.chakana_dollar_price, 
    //     element.optom_dollar_price, price_type, model.kontragent_id);
    const {dori_prixod_table, ...data } = req.body;
    model.date_time = req.body.date_time;
    model.pastavchik_id = req.body.pastavchik_id;
    model.umumiy_summa = req.body.umumiy_summa;
    model.comment = req.body.comment;
    model.save();
    this.#dori_prixod_table(model, dori_prixod_table, false);
    await register_supplierModel.destroy({
        where:{
            doc_id: model.id,
            place: 'Prixod_dori'
        }
    })
    var register = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doc_id": model.id,
        "summa": model.umumiy_summa,
        "doc_type": "Chiqim",
        "type": 0,
        "place": "Prixod_dori",
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
    
    #dori_prixod_table = async(model, dori_prixod_table, insert = true) => {
        if(!insert){
        await this.#deletePrixod_doriTable(model.id)
        await this.#deleteRegister_dori(model.id)
        }
        for(let key of dori_prixod_table){
            var tables = {
                "datetime": Math.floor(new Date().getTime() / 1000),
                "dori_id": key.dori_id,
                "price": key.price,
                "prixod_id": model.id,
                "count": key.count,
                "summa": key.summa,
                "type":1
            }
            await dori_prixod_tableModel.create(tables);
            var sereis = {
                "dori_id": key.dori_id,
                "price": key.price,
                "date_time": Math.floor(new Date().getTime() / 1000),
            }
            const newSeria = await DoriSeriesModel.create(sereis);
            var dori = {
                "dori_id": key.dori_id,
                "price": key.price,
                "doc_id": model.id,
                "count": key.count,
                "summa": key.summa,
                "type":1,
                "series_id":newSeria.id,
                "date_time": Math.floor(new Date().getTime() / 1000),
                "doc_type": "kirim"
            }
            await register_doriModel.create(dori);
        }
    }
    findOrCreateSeries = async (
            datetime, dori_id, price) => {
        
        let [model, new_model] =  await DoriSeriesModel.findOrCreate({
            where:{
                datetime: datetime,
                dori_id: dori_id, 
                price:price
            }
        });

        return model;
    }
    #deletePrixod_doriTable = async(doc_id) =>{
        await dori_prixod_tableModel.destroy(
            {
                where:{prixod_id: doc_id}
            }
        )
    }
    #deleteRegister_dori = async(id) => {
        await register_doriModel.destroy({where: {doc_id: id}})
    }
    delete = async (req, res, next) => {
    const model = await prixod_dori_Model.destroy({
            where:{
            id: req.params.id
            }
        });
        await this.#deletePrixod_doriTable(req.params.id)
        await this.#deleteRegister_dori(req.params.id)
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

    // dori All
    getReagent = async (req, res, next) => {
        const model = await db.query('SELECT `R`.`id`,`R`.`name`,  SUM(CASE WHEN `RR`.`type` = 1 THEN `RR`.`count` ELSE -`RR`.`count` END) AS `count`, SUM(CASE WHEN `RR`.`type` = 1 THEN `RR`.`summa` ELSE -`RR`.`summa` END) AS `summa` FROM `register_dori` `RR` LEFT JOIN `pill` `R` ON `RR`.`dori_id`=`R`.`id` GROUP BY `RR`.`dori_id`' , {raw: true, type: QueryTypes.SELECT })
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
module.exports = new prixod_doriController;