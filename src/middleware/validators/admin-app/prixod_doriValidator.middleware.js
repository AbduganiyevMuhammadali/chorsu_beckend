const { body } = require('express-validator');

exports.prixod_dori = [
   body('pastavchik_id')
        .exists()
        .isInt()
        .withMessage('INt typeda kiriting')
];