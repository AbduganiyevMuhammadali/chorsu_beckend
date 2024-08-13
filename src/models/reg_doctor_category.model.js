const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const PatientModel = require('./patient.model');
const DoctorModel = require('./doctor.model')

class reg_doctor_categoryModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

reg_doctor_categoryModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(),
    allowNull: false
},
price:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
doctor_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
reg_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
vazvrat: {
  type: DataTypes.BOOLEAN
},
patient_id: {
  type: DataTypes.INTEGER,
},
date_time: {
  type: DataTypes.INTEGER,
},
text: {
  type: DataTypes.TEXT,
}
}, {
  sequelize,
  modelName: 'reg_doctor_category',
  tableName: 'reg_doctor_category',
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
});
reg_doctor_categoryModel.belongsTo(PatientModel, { as: 'patient', foreignKey: 'patient_id' })
reg_doctor_categoryModel.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'doctor_id' })

module.exports = reg_doctor_categoryModel;