const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
const RegistrationModel = require("./registration.model");

class register_doctorModel extends Model {};

register_doctorModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 type: {
   type: DataTypes.STRING(400)
 },
 pay_type:{
  type: DataTypes.STRING(400)
 },
 summa_type: {
  type: DataTypes.DECIMAL()
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 doctor_id:{
  type: DataTypes.INTEGER
},
doc_type: {
  type: DataTypes.STRING()
},
comment:{
  type: DataTypes.STRING()
},
vazvrat: {
  type: DataTypes.BOOLEAN
},
place:{
  type: DataTypes.STRING()
},
all_sum: {
  type: DataTypes.DECIMAL()
}
}, {
  sequelize,
  modelName: 'register_doctor',
  tableName: 'register_doctor',
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
 
});

register_doctorModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'});
register_doctorModel.belongsTo(RegistrationModel, { as: 'registration', foreignKey: 'doc_id' });


module.exports = register_doctorModel;