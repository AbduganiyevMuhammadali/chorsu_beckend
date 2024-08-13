const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class UserPenaltyBonusRegisterModel extends Model {} 

UserPenaltyBonusRegisterModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
   },
   doc_id: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   type: {
    type: DataTypes.STRING,
   },
   type_come: {
        type: DataTypes.STRING,
   },
   summa: {
    type: DataTypes.DECIMAL(17, 3),
    defaultValue: 0
   },
   datetime: {
    type: DataTypes.INTEGER,
   },
   user_id: {
    type: DataTypes.INTEGER,
   }
}, {
  sequelize,
  modelName: 'user_penalty_bonus_register',
  tableName: 'user_penalty_bonus_register',
  timestamps: false,
});

module.exports = UserPenaltyBonusRegisterModel;