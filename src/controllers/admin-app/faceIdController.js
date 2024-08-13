
const HttpException = require('../../utils/HttpException.utils');
const userFaceidHistoryModel = require('../../models/userFaceidHistory.model');
const ComeGetBackModel = require('../../models/comegetback.model')
const ComeGetBackChildModel = require('../../models/comegetbackchild.model');
const UserPenaltyBonusModel = require('../../models/userpenaltybonus.model');
const UserPenaltyBonusRegisterModel = require('../../models/userpenaltybonusregister.model');
const PenaltiesBonusModel = require('../../models/penaltyBonus.model');
const UserModel = require('../../models/user.model');
const { Op } = require('sequelize');
/******************************************************************************
 *                              FaceId Controller
 ******************************************************************************/

class FaceIdController {
    
    getCounHistory = async(req, res, next) => {
        let { date1, date2, ipaddress } = req.body;
        
        let query = {};
        query.ipaddress = ipaddress;
        query.time = {
            [Op.gte]: date1 * 1000,
            [Op.lte]: date2 * 1000,
        }

        let modelListCount = await userFaceidHistoryModel.count({
            where: query
        })

        res.send({
            count: modelListCount
        })
    }

    writePenalty = async (model, type, user, info_time, real_come_time, leave_time = 0) => {
        if(type.startsWith('kirish')) {
            let exModel = await UserPenaltyBonusModel.findOne({
                where: {
                    doc_id: model.id,
                    type_come: 'come',
                    type: 'penalty'
                }
            })
            if (!exModel) {
                let query = {};
                let diff = Math.floor((info_time - real_come_time) / 60);
                query = {
                    [Op.and]: [
                        { min_time: { [Op.lte]: diff } },  
                        { max_time: { [Op.gte]: diff } },
                        { type: 'penalty' }                       // type = 'penalty'
                    ],
                }
                let penalty = await PenaltiesBonusModel.findOne({
                    where: query
                })
                if(penalty) {
                    const newPenalty = await UserPenaltyBonusModel.create({
                        doc_id: model.id,
                        type: "penalty",
                        type_come: 'come',
                        cause_id: penalty.id,
                        summa: penalty.summa,
                        is_resonably: false,
                        comment: '',
                        datetime: info_time,
                        user_id: user.id
                    })
                    await UserPenaltyBonusRegisterModel.create({
                        doc_id: newPenalty.id,
                        type: 'penalty',
                        type_come: 'come',
                        summa: penalty.summa,
                        datetime: info_time,
                        user_id: user.id
                    })
                }
            }
        } else if(type.startsWith('chiqish')) {
            let exModel = await UserPenaltyBonusModel.findOne({
                where: {
                    doc_id: model.id,
                    type_come: 'leave',
                    type: 'penalty'
                }
            })
            if(exModel) {
                await UserPenaltyBonusRegisterModel.destroy({
                    where: {
                        doc_id: exModel.id,
                        type_come: 'leave',
                        type: 'penalty'
                    }
                })
                await exModel.destroy();
            }

            if (info_time < leave_time) {   
                let query = {};
                let diff = Math.floor((leave_time - info_time) / 60);
                query = {
                    [Op.and]: [
                        { min_time: { [Op.lte]: diff } },  
                        { max_time: { [Op.gte]: diff } },
                        { type: 'penalty' }                       // type = 'penalty'
                    ],
                }
                
                let penalty = await PenaltiesBonusModel.findOne({
                    where: query
                })

                if(penalty) {
                    
                    const newPenalty = await UserPenaltyBonusModel.create({
                        doc_id: model.id,
                        type: "penalty",
                        type_come: 'leave',
                        cause_id: penalty.id,
                        summa: penalty.summa,
                        is_resonably: false,
                        comment: '',
                        datetime: info_time,
                        user_id: user.id
                    })

                    await UserPenaltyBonusRegisterModel.create({
                        doc_id: newPenalty.id,
                        type: 'penalty',
                        type_come: 'leave',
                        summa: penalty.summa,
                        datetime: info_time,
                        user_id: user.id
                    })
                    
                }
            }

        }
    }

    writeBonus = async (model, type, user, info_time, real_come_time, leave_time = 0) => {
        if(type.startsWith('kirish')) {
            let exModel = await UserPenaltyBonusModel.findOne({
                where: {
                    doc_id: model.id,
                    type_come: 'come',
                    type: 'bonus'
                }
            })
            if(!exModel) {
                let query = {};
                let diff = Math.floor((real_come_time - info_time) / 60);
                query = {
                    [Op.and]: [
                        { min_time: { [Op.lte]: diff } },  
                        { max_time: { [Op.gte]: diff } },
                        { type: 'bonus' }                       // type = 'bonus'
                    ],
                }
                let bonus = await PenaltiesBonusModel.findOne({
                    where: query
                })
                if(bonus) {
                    const newPenalty = await UserPenaltyBonusModel.create({
                        doc_id: model.id,
                        type: "bonus",
                        type_come: 'come',
                        cause_id: bonus.id,
                        summa: bonus.summa,
                        is_resonably: false,
                        comment: '',
                        datetime: info_time,
                        user_id: user.id
                    })
                    await UserPenaltyBonusRegisterModel.create({
                        doc_id: newPenalty.id,
                        type: 'bonus',
                        type_come: 'come',
                        summa: bonus.summa,
                        datetime: info_time,
                        user_id: user.id
                    })
                }
            }
        }  else if(type.startsWith('chiqish')) {
            let exModel = await UserPenaltyBonusModel.findOne({
                where: {
                    doc_id: model.id,
                    type_come: 'leave',
                    type: 'bonus'
                }
            })
            if (exModel) {
                await UserPenaltyBonusRegisterModel.destroy({
                    where: {
                        doc_id: exModel.id,
                        type_come: 'leave',
                        type: 'bonus'
                    }
                })
                await exModel.destroy();
            }
            if (info_time > leave_time) {   
                let query = {};
                let diff = Math.floor((info_time - leave_time) / 60);
                query = {
                    [Op.and]: [
                        { min_time: { [Op.lte]: diff } },  
                        { max_time: { [Op.gte]: diff } },
                        { type: 'bonus' }                       // type = 'bonus'
                    ],
                }
                
                let bonus = await PenaltiesBonusModel.findOne({
                    where: query
                })

                if(bonus) {
                    
                    const newBonus = await UserPenaltyBonusModel.create({
                        doc_id: model.id,
                        type: "bonus",
                        type_come: 'leave',
                        cause_id: bonus.id,
                        summa: bonus.summa,
                        is_resonably: false,
                        comment: '',
                        datetime: info_time,
                        user_id: user.id
                    })

                    await UserPenaltyBonusRegisterModel.create({
                        doc_id: newBonus.id,
                        type: 'bonus',
                        type_come: 'leave',
                        summa: bonus.summa,
                        datetime: info_time,
                        user_id: user.id
                    })
                    
                }
            }
        }
    }

    writeNewDoc = async(info, user, type, ipaddress) => {
        
        let comeTime = user.come_time;
        let leaveTime = user.leave_time;

        if (comeTime && leaveTime) {
            let splittedComeTime = comeTime.split(':');
            let splittedLeaveTime = leaveTime.split(':');
            let realCometime = new Date();
            let realLeavetime = new Date();
            realCometime.setHours(splittedComeTime[0], splittedComeTime[1], splittedComeTime[2]);
            realLeavetime.setHours(splittedLeaveTime[0], splittedLeaveTime[1], splittedLeaveTime[2]);
            let intComeTime = Math.floor(realCometime.getTime() / 1000);
            let intLeaveTime = Math.floor(realLeavetime.getTime() / 1000);
            let writeTime = Math.floor(new Date(info.time).getTime() / 1000);
            let data = {};
            if (type.startsWith('kirish')) {
                let tempTime = Math.floor(new Date(info.time).getTime() / 1000)
                data = {
                    datetime: tempTime,
                    user_id: user.id,
                    real_come_time: intComeTime,
                    real_leave_time: intLeaveTime,
                    come_time: writeTime,
                    leave_time: null,
                    do_not_come: false
                }
                
            } else {
                data = {
                    datetime: Math.floor(new Date(info.time).getTime() / 1000),
                    user_id: user.id,
                    real_come_time: intComeTime,
                    real_leave_time: intLeaveTime,
                    come_time: null,
                    leave_time: writeTime,
                    do_not_come: false
                }
            }

            let newModel = await ComeGetBackModel.create(data);
            let childData = {};
            if(type.startsWith('kirish')) {
                let tempTime = Math.floor(new Date(info.time).getTime() / 1000);
                childData = {
                    parent_id: newModel.id,
                    type: 'come',
                    datetime: tempTime,
                    ipaddress: ipaddress
                }
                if (tempTime > intComeTime) {
                    await this.writePenalty(newModel, type, user, tempTime, intComeTime);
                } else {
                    await this.writeBonus(newModel, type, user, tempTime, intComeTime)
                }
            } else {
                childData = {
                    parent_id: newModel.id,
                    type: 'leave',
                    datetime: Math.floor(new Date(info.time).getTime() / 1000),
                    ipaddress: ipaddress
                }
                await this.writePenalty(newModel, type, user, writeTime, intComeTime, intLeaveTime)
                await this.writeBonus(newModel, type, user, writeTime, intComeTime, intLeaveTime)
            }
            await ComeGetBackChildModel.create(childData)
        }
    }
    writeToExistsDoc = async(data, info, user, type, ipaddress) => {
        let model = await ComeGetBackModel.findOne({
            where: {
                id: data.id,
            }
        })
          
        let comeTime = user.come_time;
        let leaveTime = user.leave_time;
        if (comeTime && leaveTime) {
            let splittedComeTime = comeTime.split(':');
            let splittedLeaveTime = leaveTime.split(':');
            let realCometime = new Date();
            let realLeavetime = new Date();
            realCometime.setHours(splittedComeTime[0], splittedComeTime[1], splittedComeTime[2]);
            realLeavetime.setHours(splittedLeaveTime[0], splittedLeaveTime[1], splittedLeaveTime[2]);
            let intComeTime = Math.floor(realCometime.getTime() / 1000);
            let intLeaveTime = Math.floor(realLeavetime.getTime() / 1000);
            let writeTime = Math.floor(new Date(info.time).getTime() / 1000);
            let childData = {};
            if(type.startsWith('kirish')) {
                if(!model.come_time) {
                    model.come_time =  writeTime;
                    await model.save()
                    if(writeTime > intComeTime) {
                        await this.writePenalty(data, type, user, writeTime, intComeTime)
                    } else {
                        await this.writeBonus(data, type, user, writeTime, intComeTime)
                    }
                }
            
                childData = {
                    parent_id: data.id,
                    type: 'come',
                    datetime: Math.floor(new Date(info.time).getTime() / 1000),
                    ipaddress: ipaddress
                }
            } else {
                childData = {
                    parent_id: data.id,
                    type: 'leave',
                    datetime: Math.floor(new Date(info.time).getTime() / 1000),
                    ipaddress: ipaddress
                }
                model.leave_time = Math.floor(new Date(info.time).getTime() / 1000);
                await model.save()
                await this.writePenalty(data, type, user, writeTime, intComeTime, intLeaveTime)
                await this.writeBonus(data, type, user, writeTime, intComeTime, intLeaveTime)
            }
            await ComeGetBackChildModel.create(childData)
        }
    }
    writeToDoc = async(info, type, ipaddress) => {
        var startOfDay = new Date(info.time);
        var endOfDay = new Date(info.time);

        // Set the time to the beginning of the day (midnight)
        startOfDay.setHours(0, 0, 0, 0);

        // Set the time to the end of the day (23:59:59:999)
        endOfDay.setHours(23, 59, 59, 999);
        startOfDay = Math.floor(startOfDay.getTime() / 1000);
        endOfDay = Math.floor(endOfDay.getTime() / 1000);
        let user = await UserModel.findOne({
            where: {
                user_name: info.name,
            }
        });
        let query = {};
        query.datetime = {
            [Op.gte]: startOfDay,
            [Op.lte]: endOfDay
        }
        if(user) {
            query.user_id = user.id;
            let model = await ComeGetBackModel.findOne({
                where: query,
            })
            if(!model) {
                await this.writeNewDoc(info, user, type, ipaddress);
            } else {
                await this.writeToExistsDoc(model, info, user, type, ipaddress);
            }
            
        }
    }
    createHistory = async(req, res, next) => {

        let { InfoList, ipaddress, type } = req.body;
        for (const info of InfoList) {
            
            await userFaceidHistoryModel.create({
                ipaddress: ipaddress,
                ...info
            })

            if(info.minor == 75 && info.major == 5) {
                await this.writeToDoc(info, type, ipaddress)
            }
        }

        res.send("OK")
    }
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new FaceIdController;