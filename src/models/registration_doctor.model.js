const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
const DoctorCategory = require('../models/doctor_category.model');
const Registration_recipeModel = require('./registration_recipe.model');
const register_mkb = require('./register_mkb.model');
const reg_doctor_categoryModel = require('./reg_doctor_category.model');
const PatientModel = require('./patient.model');
const A4ImagesModel = require('./a4Images.model');

class Registration_doctorModel extends Model {};

Registration_doctorModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  doctor_id: {
      type: DataTypes.INTEGER
  },
  vazvrat: {
    type: DataTypes.BOOLEAN
},
  registration_id : {
      type: DataTypes.INTEGER
  },
  status:{
      type:DataTypes.STRING(200),
      allowNull: false
  },
  price:{
      type: DataTypes.DECIMAL(),
      allowNull: false
  },
  backlog:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  table_type: {
    type: DataTypes.BOOLEAN
  },
  key:{
    type:DataTypes.STRING(200),
  },
  pay_summa:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text:{
      type:DataTypes.TEXT,
},
date_time:{
  type: DataTypes.INTEGER,
  allowNull: false
},
date_doctor: {
  type: DataTypes.STRING
},
vazvrat: {
  type: DataTypes.BOOLEAN,
},
patient_id: {
  type: DataTypes.INTEGER,
}
}, {
  sequelize,
  modelName: 'registration_doctor',
  tableName: 'registration_doctor',
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
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password_hash'] },
    }
  }
});
Registration_doctorModel.hasMany(register_mkb, {as:'register_mkb', foreignKey: 'registration_id'})
// Registration_recipeModel.hasOne(Registration_doctorModel, {as: 'registration_recipe', foreignKey: 'registration_doctor_id'})
Registration_doctorModel.hasMany(Registration_recipeModel, {as: 'registration_recipe',  foreignKey: 'registration_doctor_id'})
Registration_doctorModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
Registration_doctorModel.belongsTo(DoctorCategory, {as: 'doctor_category', foreignKey: 'id'});
Registration_doctorModel.hasMany(reg_doctor_categoryModel, {as: 'reg_doctor_category', foreignKey: 'doctor_id'})
Registration_doctorModel.belongsTo(PatientModel, { as: 'patient', foreignKey: 'patient_id' })
Registration_doctorModel.hasMany(A4ImagesModel, { as: 'a4_images', foreignKey: 'key', sourceKey: 'key' })


module.exports = Registration_doctorModel;