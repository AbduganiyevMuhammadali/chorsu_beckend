const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const SurgeryDoctorModel = require('./surgery_doctor')
const DoctorModel = require('./doctor.model')
const RegistrationModel = require('./registration.model')
const PatientModel = require('./patient.model')
const SurgeryModel = require("./surgery");

class surgerygModelresgister extends Model {
  toJSON() {//Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

surgerygModelresgister.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  doctor_id: {
    type: DataTypes.INTEGER
  },
  registration_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN
  },
  surgery_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_doctor: {
    type: DataTypes.STRING
  },
  all_summa: {
    type: DataTypes.DECIMAL
  },
  text:{
    type: DataTypes.TEXT
  },
  before_sur_text:{
    type: DataTypes.TEXT
  },
  after_sur_text:{
    type: DataTypes.TEXT
  },
  name:{
    type: DataTypes.STRING
  },
  price:{
    type: DataTypes.DECIMAL
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
  vazvrat:{
    type: DataTypes.BOOLEAN
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  doctor_summa: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'surgery_registration',
  tableName: 'surgery_registration',
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
// surgerygModelresgister.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
// surgery.belongsTo(surgerygModelresgister, { as: 'surgery', foreignKey: 'surgery_id' })
// surgerygModelresgister.belongsTo(surgery, { as: 'surgery', foreignKey: 'surgery_id' })
// surgerygModelresgister.belongsTo(SurgeryDoctorModel, { as: 'surgery_doctor', foreignKey: 'doctor_id' })
RegistrationModel.hasMany(surgerygModelresgister, { as: 'surgery_registration', foreignKey: 'registration_id' })
// surgerygModelresgister.hasMany(surgery_child, { as: 'surgery_table', foreignKey: 'surgery_registration_id' })
surgerygModelresgister.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'doctor_id' })
surgerygModelresgister.belongsTo(PatientModel, { as: 'patient', foreignKey: 'patient_id' })
surgerygModelresgister.belongsTo(SurgeryModel, { as: 'surgery', foreignKey: 'surgery_id' })

module.exports = surgerygModelresgister;