
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const surgeryCategoryModel = require('../../models/surgery_category');
const DoctorModel = require('../../models/doctor.model');
// const client = require('../../startup/client')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class surgeryCategoryController {
  getAll = async (req, res, next) => {
    const model = await surgeryCategoryModel.findAll({
      include: [
        {
          model: DoctorModel,
          as: 'doctor',
          required: false
        }
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

  getOne = async (req, res, next) => {
    const model = await surgeryCategoryModel.findOne({
      include: [
        {
          model: DoctorModel,
          as: 'doctor',
          required: false
        }
      ],
      where: {
        id: req.params.id
      }
    });
    if (!model) {
      throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
    }
    res.status(200).send({
      error: false,
      error_code: 200,
      message: 'Malumotlar chiqdi',
      data: model
    })
    // client.setex('inspectionOne', 3600, JSON.stringify(model))
  }

  create = async (req, res, next) => {
    this.checkValidation(req);
    const body = req.body;
    const model = await surgeryCategoryModel.create({
      "name": body.name || ' ',
      "price": body.price || 0,
      "citizen_price": body.citizen_price || 0,
      "doctor_id": body.doctor_id,
      "percent": body.percent,
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: 'Malumotlar qo\'shildi',
      data: model
    });
  }
  update = async (req, res, next) => {

    const body = req.body;
    const model = await surgeryCategoryModel.findOne({
      where: {
        id: req.params.id
      }
    })
    if (model === null) {
      return res.status(404).send("model mavjud emas")
    }
    model.name = body.name;
    model.price = body.price;
    model.citizen_price = body.citizen_price;
    model.doctor_id = body.doctor_id;
    model.percent = body.percent;
    await model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: 'Malumotlar tahrirlandi',
      data: model
    });
  }

  delete = async (req, res, next) => {
    const model = await surgeryCategoryModel.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!model) {
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
module.exports = new surgeryCategoryController;