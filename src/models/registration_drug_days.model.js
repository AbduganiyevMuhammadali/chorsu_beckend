const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');

class RegistrationDrugDaysModel extends Model {}

RegistrationDrugDaysModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  day: {
    type: DataTypes.DATE,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },


}, {
  sequelize,
  modelName: 'registration_drug_days',
  tableName: 'registration_drug_days',
  timestamps: false,
});

module.exports = RegistrationDrugDaysModel;