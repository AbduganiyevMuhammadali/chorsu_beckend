const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class ComeGetBackChildModel extends Model {} 

ComeGetBackChildModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
   },
   parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   type: {
    type: DataTypes.STRING,
   },
   datetime: {
    type: DataTypes.INTEGER,
   },
   ipaddress: {
    type: DataTypes.STRING,
   }
}, {
  sequelize,
  modelName: 'come_and_get_back_child',
  tableName: 'come_and_get_back_child',
  timestamps: false,
});

module.exports = ComeGetBackChildModel;