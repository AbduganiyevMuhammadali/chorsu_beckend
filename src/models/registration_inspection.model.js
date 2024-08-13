const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection = require('../models/inspection.model');
const inspectionChildModel = require('./inspectionChild.model');
const inspection_categoryModel = require('./inspector_category.model');
const Registration_inspection_childModel = require('./registration_inspection_child.model');
const PatientModel = require('./patient.model');
const A4ImagesModel = require('./a4Images.model');


class Registration_inspectionModel extends Model {}

Registration_inspectionModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  inspection_id: {
      type: DataTypes.INTEGER
  },
  user_id:{
    type: DataTypes.INTEGER
  },
  vazvrat: {
    type: DataTypes.BOOLEAN
},
  registration_id : {
      type: DataTypes.INTEGER
  },
  table_type: {
    type: DataTypes.BOOLEAN
  },
  type:{
      type:DataTypes.BOOLEAN,
      allowNull: false
  },
  price:{
    type: DataTypes.INTEGER,
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
  pay_summa:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  key: {
    type:DataTypes.STRING(200),
  },
//inspection_category
  category_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(200),
      allowNull: false
  },
  date_time:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  date_doctor: {
    type: DataTypes.STRING
  },
  skidka:{
    type: DataTypes.DECIMAL
  },
  select:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  uzi:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  shablon:{
    type: DataTypes.BOOLEAN
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  chek: {
    type: DataTypes.BOOLEAN,
  }
}, {
  sequelize,
  modelName: 'registration_inspection',
  tableName: 'registration_inspection',
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
// Registration_inspectionModel.hasMany(Registration_inspection_childModel, {as: 'registration_inspection_child', foreignKey: 'id'});
Registration_inspectionModel.belongsTo(inspection, {as: 'inspection', foreignKey: 'inspection_id'})
Registration_inspectionModel.hasMany(Registration_inspection_childModel, {as: 'registration_inspection_child', foreignKey: 'parent_id'})
Registration_inspectionModel.belongsTo(inspection_categoryModel, {as: 'category', foreignKey: 'category_id'})
Registration_inspectionModel.belongsTo(PatientModel, { as: 'patient', foreignKey: 'patient_id' });
Registration_inspectionModel.hasMany(A4ImagesModel, { as: 'a4_images', foreignKey: 'key', sourceKey: 'key' });


// Registration_inspectionModel.hasMany(RegistrationModel, {as: 'registration', foreignKey: 'registration_id'})
module.exports = Registration_inspectionModel;