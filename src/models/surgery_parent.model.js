const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class surgeryParentModel extends Model {}

surgeryParentModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name:{
    type: DataTypes.STRING,
    notNull: true
  },
}, {
  sequelize,
  modelName: 'surgeryParentModel',
  tableName: 'surgery_parent',
  timestamps: false,
});

module.exports = surgeryParentModel;