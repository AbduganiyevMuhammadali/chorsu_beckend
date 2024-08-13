const { body } = require('express-validator');

exports.InspectionsVAlidator = [
body('registration_inspection_child')
        .exists()
        .withMessage('InspectionChildni to\'ldiring')
        .isArray()
        .withMessage('massiv ko\'rinishida')
];