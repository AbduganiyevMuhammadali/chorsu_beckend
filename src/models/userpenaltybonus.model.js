const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const PenaltyBonusModel = require('./penaltyBonus.model');

class UserPenaltyBonusModel extends Model {} 

UserPenaltyBonusModel.init({
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
   cause_id: {
    type: DataTypes.INTEGER,
   },
   summa: {
    type: DataTypes.DECIMAL(17, 3),
    defaultValue: 0
   },
   is_resonably: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
   },
   comment: {
    type: DataTypes.TEXT,
   },
   datetime: {
    type: DataTypes.INTEGER,
   },
   user_id: {
    type: DataTypes.INTEGER,
   }
}, {
  sequelize,
  modelName: 'user_penalty_bonus',
  tableName: 'user_penalty_bonus',
  timestamps: false,
});


UserPenaltyBonusModel.belongsTo(PenaltyBonusModel, { as: 'cause', foreignKey: 'cause_id' })
module.exports = UserPenaltyBonusModel;