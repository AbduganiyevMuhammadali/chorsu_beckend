const { body } = require('express-validator');

exports.penaltyBonusValidate = [
   body('min_time')
        .exists()
        .withMessage("minimal vaqt kiritilishi kerak!"),
    body('max_time')
        .exists()
        .withMessage("maximal vaqt kiritilishi kerak!"),
    body('cause')
        .exists()
        .withMessage("sabab kiritilish kerak!"),
    body('type')
        .exists()
        .withMessage('turini tanlang!')
        .custom((val) => {
            let arr = ['penalty', 'bonus'];
            if (!arr.includes(val)) {
                return Promise.reject("turi xato kiritildi!")
            }
            return Promise.resolve()
        }),
    body('summa')
        .exists()
        .withMessage("summa kiritilishi kerak!")
        
];