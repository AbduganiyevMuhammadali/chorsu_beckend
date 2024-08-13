const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const PatientModel = require('./patient.model');
const PalataModel = require('./palata.model');
const DoctorModel = require('./doctor.model');
const RegistrationModel = require('./registration.model');
const RoomModel = require('./room.model')

class register_palataModel extends Model {
    // toJSON () {//Api da ishladi
    // var values = Object.assign({}, this.get());
    //     delete values.password_hash;
    //     return values;
    // }
}

register_palataModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 palata_id: {
   type: DataTypes.INTEGER,
 },
 room_id: {
  type: DataTypes.INTEGER,
 },
 vazvrat: {
  type: DataTypes.BOOLEAN
},
category_id: {
  type: DataTypes.INTEGER,
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
 registration_id:{
   type: DataTypes.INTEGER,
 },
 patient_id:{
  type: DataTypes.INTEGER,
},
 day:{
  type: DataTypes.INTEGER
},
date_to:{
  type: DataTypes.INTEGER
},
date_do:{
  type: DataTypes.INTEGER
},
doctor_id: {
  type: DataTypes.INTEGER,
},
doctor_price: {
  type: DataTypes.DECIMAL(),
},
palatas: {
  type: DataTypes.VIRTUAL
},
all_pay_summa: {
  type: DataTypes.VIRTUAL
}
}, {
  sequelize,
  modelName: 'register_palata',
  tableName: 'register_palata',
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

register_palataModel.belongsTo(PalataModel, { as: 'palata', foreignKey: 'palata_id' })
register_palataModel.belongsTo(PatientModel, { as: 'patient', foreignKey: 'patient_id' })
register_palataModel.belongsTo(RegistrationModel, {as: 'registration', foreignKey: 'registration_id' })
register_palataModel.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'doctor_id' })
register_palataModel.belongsTo(RoomModel, { as: 'room', foreignKey: 'room_id' })
module.exports = register_palataModel;