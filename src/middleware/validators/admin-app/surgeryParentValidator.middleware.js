const { body } = require('express-validator');

exports.surgeryParent = [
   body('name')
        .exists()
        .isString()
        .isLength({min: 3, max: 300})
        .withMessage('eng kamida 4 ta harfdan iborat bolsin')
  
];