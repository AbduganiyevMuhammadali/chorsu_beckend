const { DataTypes, Model, VIRTUAL } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const palataModel = require('../models/palata.model')
const PatientModel = require('./patient.model');
const UserModel = require('./user.model')
const DoctorModel = require('./doctor.model')
const RoomModel = require('./room.model')

class registration_palataModel extends Model {}

registration_palataModel.init({
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
   type: DataTypes.INTEGER(40),
 },
 vazvrat: {
  type: DataTypes.BOOLEAN
},
backlog:{
  type: DataTypes.INTEGER,
  allowNull: false
},
discount:{
  type: DataTypes.INTEGER,
  allowNull: false
},
key:{
  type:DataTypes.STRING(200),
},
pay_summa:{
  type: DataTypes.INTEGER,
  allowNull: false
},
 price:{
   type: DataTypes.DECIMAL(),
   allowNull: false
 },
 registration_id:{
   type: DataTypes.INTEGER,
   allowNull: false
 },
 day:{
  type: DataTypes.INTEGER
},
date_to:{
  type: DataTypes.INTEGER
},
total_price:{
  type: DataTypes.DECIMAL
},
date_do:{
  type: DataTypes.INTEGER
},
status: DataTypes.VIRTUAL,
commentt: {
  type: DataTypes.VIRTUAL,
},
comment: {
  type: DataTypes.TEXT,
},
user_id: {
  type: DataTypes.INTEGER,
},
category_id: {
  type: DataTypes.INTEGER,
},
room_id: {
  type: DataTypes.INTEGER,
},
patient_id: {
  type: DataTypes.INTEGER,
},
doctor_summa: {
  type: DataTypes.VIRTUAL,
}
}, {
  sequelize,
  modelName: 'registration_palata',
  tableName: 'registration_palata',
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
palataModel.hasMany(registration_palataModel, {as: 'palatas', foreignKey: 'palata_id'});
registration_palataModel.belongsTo(palataModel, {as:'palatas', foreignKey: 'palata_id'});
registration_palataModel.belongsTo(PatientModel, { as: 'patient', foreignKey: 'patient_id' });
registration_palataModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' })
registration_palataModel.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'user_id' })
registration_palataModel.belongsTo(RoomModel, { as: 'room', foreignKey: 'room_id' })

module.exports = registration_palataModel;