
const HttpException = require('../../utils/HttpException.utils');

/******************************************************************************
 *                              Calculate Payment User Controller
 ******************************************************************************/
class calculatePaymentUser {
 
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
module.exports = new calculatePaymentUser;