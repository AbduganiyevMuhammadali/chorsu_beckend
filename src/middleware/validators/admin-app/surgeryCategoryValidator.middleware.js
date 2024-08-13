const { body } = require('express-validator');
const DoctorModel = require('../../../models/doctor.model');

exports.surgeryCategory = [
   body('name')
        .exists()
        .isString()
        .withMessage('string typeda kiriting')
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin'),
    body('price')
         .exists()
         .isDecimal()
         .withMessage('decmal tipida kiriting')
     // body('bolim_id')
     //     .exists()
     //     .isInt()
     //     .withMessage(' bolim tanleng')
     //     .custom(async val => {
     //      return bol.findOne({where: {id: val}}).then((val) => {
     //           if(val == null){
     //                return Promise.reject("doctor mavjud emas")
     //           }
     //      })
     //     })
];