
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const surgeryParentModel = require('../../models/surgery_parent.model');

/******************************************************************************
 *                              surgeryParent Controller
 ******************************************************************************/

class surgeryParentController {
  getAll = async (req, res, next) => {
    const model = await surgeryParentModel.findAll({});
    res.status(200).send({
      error: false,
      error_code: 200,
      message: 'Malumotlar chiqdi',
      data: model
    });
  }

  getOne = async (req, res, next) => {
    const model = await surgeryParentModel.findOne({
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
  }

  create = async (req, res, next) => {
    this.checkValidation(req);
    const body = req.body;
    const model = await surgeryParentModel.create({
      "name": body.name || ' ',
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
    const model = await surgeryParentModel.findOne({
      where: {
        id: req.params.id
      }
    })
    if(!model) {
        throw new HttpException("model topilmadi!")
    }
    model.name = body.name;
    await model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: 'Malumotlar tahrirlandi',
      data: model
    });
  }

  delete = async (req, res, next) => {
    const model = await surgeryParentModel.destroy({
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
module.exports = new surgeryParentController;