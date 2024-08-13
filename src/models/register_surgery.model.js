const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const SurgeryModel = require('./surgery');
// const DoctorModel = require('./doctor.model');
const RegistrationModel = require('./registration.model')
class register_surgeryModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

register_surgeryModel.init({
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
 price:{
   type: DataTypes.DECIMAL()
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 surgery_id:{
  type: DataTypes.INTEGER
},
doc_type: {
  type: DataTypes.STRING()
},
comment:{
  type: DataTypes.STRING()
},
vazvrat: {
  type: DataTypes.STRING()
},
place:{
    type: DataTypes.STRING()
},
surgery_price:{
    type: DataTypes.DECIMAL()
}

}, {
  sequelize,
  modelName: 'register_surgery',
  tableName: 'register_surgery',
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

register_surgeryModel.belongsTo(RegistrationModel, { as: 'registration', foreignKey: 'doc_id' })
register_surgeryModel.belongsTo(SurgeryModel, { as: 'surgery', foreignKey: 'surgery_id' })

// register_surgeryModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
module.exports = register_surgeryModel;