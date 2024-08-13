const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const RegistrationDrugChildModel = require('./registration_drug_child.model')
const RegistrationDrugDaysModel = require('./registration_drug_days.model')
class RegistrationDrugModel extends Model {}

RegistrationDrugModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  reg_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  days: {
    type: DataTypes.TEXT
  }

}, {
  sequelize,
  modelName: 'registration_drug',
  tableName: 'registration_drug',
  timestamps: false,
});
RegistrationDrugModel.hasMany(RegistrationDrugChildModel, {as: 'registration_drug_child', foreignKey: 'parent_id'});
RegistrationDrugModel.hasMany(RegistrationDrugDaysModel, {as: 'registration_drug_days', foreignKey: 'parent_id'});

module.exports = RegistrationDrugModel;