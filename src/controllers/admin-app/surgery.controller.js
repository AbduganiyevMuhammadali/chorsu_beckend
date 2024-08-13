
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const surgeryModel = require('../../models/surgery');
const DoctorModel = require('../../models/doctor.model');
const surgeryParentModel = require('../../models/surgery_parent.model');
// const client = require('../../startup/client')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class SurgeryController {
  getAll = async (req, res, next) => {
    const model = await surgeryModel.findAll({
      attributes: [
        'id',
        'name',
        'doctor_id',
        'doctor_precent',
        'price',
        'citizen_price',
        'parent_id'
      ],
      include: [
        { model: DoctorModel, as: 'doctor', attributes: ['id', "name"] },
        {
          model: surgeryParentModel,
          as: 'parent',
          required: false
        }
      ]
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
    const model = await surgeryModel.findOne({
        attributes: [
          'id',
          'name',
          'doctor_id',
          'doctor_precent',
          'price',
          'citizen_price',
          'parent_id'
          ],
          include: [
            { model: DoctorModel, as: 'doctor', attributes: ['id', "name"] },
            {
              model: surgeryParentModel,
              as: 'parent',
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
    const model = await surgeryModel.create({
      "name": body.name || ' ',
      "doctor_precent": body.doctor_precent || 0,
      "doctor_id": body.doctor_id,
      "price": body.price,
      "citizen_price": body.citizen_price,
      "parent_id": body.parent_id
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
    const model = await surgeryModel.findOne({
      attributes: [
        'id',
        'name',
        'doctor_id',
        'doctor_precent',
        'price',
        'citizen_price',
        'parent_id'
      ],
      where: {
        id: req.params.id
      }
    })
    if (model === null) {
      return res.status(404).send("model mavjud emas")
    }
    model.name = body.name;
    model.doctor_precent = body.doctor_precent;
    model.doctor_id = body.doctor_id;
    model.price = body.price;
    model.citizen_price = body.citizen_price;
    model.parent_id = body.parent_id;
    await model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: 'Malumotlar tahrirlandi',
      data: model
    });
  }

  delete = async (req, res, next) => {
    const model = await surgeryModel.destroy({
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
module.exports = new SurgeryController;