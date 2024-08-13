const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const ComeGetBackChildModel = require('./comegetbackchild.model');
class ComeGetBackModel extends Model {} 

ComeGetBackModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
   },
   datetime: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   real_come_time: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
   real_leave_time: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
   come_time: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
   leave_time: {
    type: DataTypes.INTEGER,
    allowNull: true
   },
   do_not_come: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
   }
}, {
  sequelize,
  modelName: 'come_and_get_back',
  tableName: 'come_and_get_back',
  timestamps: false,
});

ComeGetBackModel.hasMany(ComeGetBackChildModel, { as: 'child', foreignKey: 'parent_id' });

module.exports = ComeGetBackModel;