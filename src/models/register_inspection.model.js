const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const InspectionCategory = require('./inspector_category.model')
const RegistrationModel = require('./registration.model')
const UserModel = require('./user.model');
const inspectionModel = require('./inspection.model');
class Register_inspectionModel extends Model {}

Register_inspectionModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 vazvrat: {
  type: DataTypes.BOOLEAN
},
 type: {
   type: DataTypes.STRING(400)
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 pay_type:{
  type: DataTypes.STRING(400)
 },
 summa_type: {
  type: DataTypes.DECIMAL()
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 user_id:{
  type: DataTypes.INTEGER
},
inspection_id:{
  type: DataTypes.INTEGER
},
inspection_category:{
  type: DataTypes.INTEGER,
},
doc_type:{
  type: DataTypes.STRING()
},
comment:{
  type: DataTypes.STRING()
},
place:{
  type:DataTypes.STRING()
},
doctor_price: {
  type: DataTypes.DECIMAL
}
}, {
  sequelize,
  modelName: 'register_inspection',
  tableName: 'register_inspection',
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
Register_inspectionModel.belongsTo(InspectionCategory, {as: 'inspection', foreignKey: 'inspection_category'})
Register_inspectionModel.belongsTo(inspectionModel, {as: 'inspec', foreignKey: 'inspection_id'})
Register_inspectionModel.belongsTo(RegistrationModel, {as: 'registration', foreignKey: 'doc_id'})
Register_inspectionModel.belongsTo(UserModel, {as: 'user', foreignKey: 'user_id'})
module.exports = Register_inspectionModel;