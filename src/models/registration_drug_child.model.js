const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class RegistrationDrugChildModel extends Model {}

RegistrationDrugChildModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dori_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  day: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  comment: {
    type: DataTypes.STRING(250)
  },
  count:{
    type:DataTypes.INTEGER
  }

}, {
  sequelize,
  modelName: 'registration_drug_child',
  tableName: 'registration_drug_child',
  timestamps: false,
});

module.exports = RegistrationDrugChildModel;