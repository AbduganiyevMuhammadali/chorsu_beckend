const { body } = require('express-validator');
const DoctorModel = require('../../../models/doctor.model');

exports.surgery = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('doctor_precent')
         .exists()
         .isDecimal()
         .withMessage('decmal tipida kiriting'),
     body('doctor_id')
         .exists()
         .isInt()
         .withMessage(' shifokor tanleng')
         .custom(async val => {
          return DoctorModel.findOne({where: {id: val}}).then((val) => {
               if(val == null){
                    return Promise.reject("doctor mavjud emas")
               }
          })
         }),
     body('parent_id')
         .exists()
         .isInt()
];