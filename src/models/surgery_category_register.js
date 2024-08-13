const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const SurgeryCategory = require("./surgery_category")
const Surgery = require("./surgery")
const DoctorModel = require('./doctor.model');

class surgeryCategoryModelresgister extends Model {}

surgeryCategoryModelresgister.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  doc_id: {
    type: DataTypes.INTEGER, 
  },
  doc_type: {
    type: DataTypes.STRING,
  },
  date_time: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: DataTypes.DECIMAL
  },        
  all_price: {
    type: DataTypes.DECIMAL
  },
  place: {
    type: DataTypes.STRING,
  },
  surgery_id: {
    type: DataTypes.INTEGER,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  modelName: 'register_surgery_category',
  tableName: 'register_surgery_category',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ],
  //findOne da yoki findAll da chaqirish kerak
})

surgeryCategoryModelresgister.belongsTo(SurgeryCategory, { as: 'category', foreignKey: 'category_id' })
surgeryCategoryModelresgister.belongsTo(Surgery, { as: 'surgery', foreignKey: 'surgery_id' })
surgeryCategoryModelresgister.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'doctor_id' })

module.exports = surgeryCategoryModelresgister;