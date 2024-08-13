
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { sequelize } = require("../../models/user.model");
const shablon_recipeModel = require('../../models/shablon_recipe.model')
const shablon_recipe_nameModel = require('../../models/shablon_recipe_name.model');
const PillModel = require('../../models/pill.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class shablon_recipe_namController {
    getAll = async (req, res, next) => {
        const model = await shablon_recipeModel.findAll({
            
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    shablonDoctor = async(req, res, next) => {
        const model = await shablon_recipe_nameModel.findAll({
            where:{
                doctor_id: req.body.doctor_id
            },
            include: [
                {
                    model: shablon_recipeModel,
                    as: 'shablon_recipe',
                    include: [
                        {
                            model: PillModel,
                            as: 'pill'
                        },
                    ],
                    raw : true,
                    nest : true
                }
            ]
        })
        if(!model){
            throw new HttpException(404, "malumot topilmadi")
        }
        res.send({
            error: false,
            error_code: 0,
            message: 'Malumotlar chiqdi',
            data: model
        })
    }

    getOne = async (req, res, next) => {
        const model = await shablon_recipe_nameModel.findOne({
            where:{
                id: req.params.id
            },
            include: [
                {
                    model: shablon_recipeModel,
                    as: 'shablon_recipe',
                    include: [
                        {
                            model: PillModel,
                            as: 'pill'
                        }
                    ]
                }
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
    //    this.checkValidation(req);
        let transaction = await sequelize.transaction()
        try{
            let { shablon_recipe, ...data } = req.body
            const model = await shablon_recipe_nameModel.create(data, {transaction: transaction});
            let recipeData = []
            for (const el of shablon_recipe) {
                let dataRec = {
                    parent_id: model.id,
                    doctor_id: el.doctor_id,
                    pill_id: el.pill_id,
                    time: Number(el.time),
                    day: Number(el.day),
                    comment: el.comment,
                    name: el.name,
                }
                recipeData.push(dataRec)
            }
            await shablon_recipeModel.bulkCreate(recipeData, {transaction: transaction})

            await transaction.commit();
            res.status(200).send({
                error: false,
                error_code: 200,
                message: 'Malumotlar qo\'shildi',
                data: model
            });
        } catch (error) {
            await transaction.rollback()
            console.log(error, "shablon_recipe_name_create");
            throw new HttpException(500, "Internal server error");
        }
   }
   update = async (req, res, next) => {
        let transaction = await sequelize.transaction()
        try {
            const model = await shablon_recipe_nameModel.findOne({
                where:{
                    id: req.params.id
                 }
             });
             let { shablon_recipe, ...data } = req.body
             model.name = data.name;
             model.doctor_id = data.doctor_id;
             model.save({transaction: transaction});
             await shablon_recipeModel.destroy({
                where: {
                    parent_id: model.id
                }
             })
             let recipeData = []
             for (const el of shablon_recipe) {
                 let dataRec = {
                     parent_id: model.id,
                     doctor_id: el.doctor_id,
                     pill_id: el.pill_id,
                     time: el.time,
                     day: el.day,
                     comment: el.comment,
                     name: el.name,
                 }
                 recipeData.push(dataRec)
             }
             await shablon_recipeModel.bulkCreate(recipeData, {transaction: transaction})
     
             await transaction.commit();
             res.status(200).send({
                 error: false,
                 error_code: 200,
                 message: 'Malumotlar tahrirlandi',
                 data: model
             });
        } catch (error) {
            await transaction.rollback()
            console.log(error, "shablon_recipe_name_Update");
            throw new HttpException(500, "Internal server error");
        }
    }
delete = async (req, res, next) => {
  const model = await shablon_recipe_nameModel.destroy({
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
module.exports = new shablon_recipe_namController;