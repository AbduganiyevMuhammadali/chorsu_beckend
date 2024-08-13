
const HttpException = require('../../utils/HttpException.utils');
const UserModel = require('../../models/user.model');
const ComeGetBackModel = require('../../models/comegetback.model')
const ComeGetBackChildModel = require('../../models/comegetbackchild.model')
const { Op } = require('sequelize');
const UserPenaltyBonusModel = require('../../models/userpenaltybonus.model');
const UserPenaltyBonusRegisterModel = require('../../models/userpenaltybonusregister.model');
const PenaltyBonusModel = require('../../models/penaltyBonus.model');

const sequelize = require('sequelize')
/******************************************************************************
 *                              UserComeLeave Controller
 ******************************************************************************/
class UserComeLeaveController {
    
    getDailyComing = async (req, res, next) => {
        
        let { datetime1, datetime2, user_id } = req.body;

        let query = {}, queryUser = {};

        query.datetime = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }

        if(user_id) {
            queryUser.id = user_id;
        }

        let modelList = await UserModel.findAll({
            attributes: ['id', 'user_name', 'come_time', 'leave_time'],
            include: [
                {
                    model: ComeGetBackModel,
                    as: 'come_doc',
                    required: false,
                    where: query,
                    include: [
                        {
                            model: ComeGetBackChildModel,
                            as: 'child',
                            required: false
                        }
                    ]
                }
            ],
            where: queryUser,
            order: [
                ['id', "ASC"]
            ]
        });

        res.send(modelList)
    }

    getDailyPenalyBonus = async (req, res, next) => {
        let { datetime1, datetime2, user_id, type } = req.body;

        let query = {}, queryUser = {};

        query.datetime = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2,
        }
        if (type) {
            query.type = type;
        }
        if(user_id) {
            queryUser.id = user_id;
        }

        let modelList = await UserModel.findAll({
            attributes: ['id', 'user_name', 'come_time', 'leave_time', 
                [sequelize.literal("SUM(CASE WHEN `penalty_bonus`.`type` = 'penalty' AND `penalty_bonus`.`is_resonably` = false THEN `penalty_bonus`.`summa` ELSE 0 END)"), 'all_penalty'],
                [sequelize.literal("SUM(CASE WHEN `penalty_bonus`.`type` = 'bonus' AND `penalty_bonus`.`is_resonably` = false THEN `penalty_bonus`.`summa` ELSE 0 END)"), 'all_bonus']
            ],
            include: [
                {
                    attributes: ['id', 'doc_id', 'type', 'type_come', 'cause_id', 'summa', 'is_resonably', 'comment', 'datetime', 'user_id',
                    ],
                    model: UserPenaltyBonusModel,
                    as: 'penalty_bonus',
                    required: false,
                    where: query,
                    include: [
                        {
                            model: PenaltyBonusModel,
                            as: 'cause',
                            required: false
                        }
                    ]
                }
            ],
            where: queryUser,
            group: ['id'],
            order: [
                ['id', "ASC"]
            ]
        });

        res.send(modelList)
    }

    changePenalty = async(req, res, next) => {
        let model = await UserPenaltyBonusModel.findOne({
            where: {
                id: req.body.id,
            },
        })
        model.comment = req.body.comment
        model.is_resonably = req.body.is_resonably
        await model.save()
        await this.add(model)
        res.send(model)
    }
    
    add = async(data) => {
        await UserPenaltyBonusRegisterModel.destroy({
            where: {
                doc_id: data.id
            }
        })
        
        if(!data.is_resonably) {
            
            await UserPenaltyBonusRegisterModel.create({
                doc_id: data.id,
                type: data.type,
                type_come: data.type_come,
                summa: data.summa,
                datetime: data.datetime,
                user_id: data.user_id,
            });

        }
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
module.exports = new UserComeLeaveController;