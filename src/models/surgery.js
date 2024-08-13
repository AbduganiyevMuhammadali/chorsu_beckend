const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const user = require('./user.model')
// const surgerytable = require('./surgery_doctor');
// const RegistrationModel = require('./registration.model')
const DoctorModel = require('./doctor.model');

const surgeryParentModel = require('./surgery_parent.model');

class surgerygModel extends Model {}

surgerygModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  doctor_id: {
    type: DataTypes.INTEGER
  },
  doctor_precent:{
    type: DataTypes.DECIMAL
  },
  price:{
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  citizen_price:{
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'surgery',
  tableName: 'surgery',
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
surgerygModel.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'doctor_id' })
surgerygModel.belongsTo(surgeryParentModel, { as: 'parent', foreignKey: 'parent_id' })
// surgerytable.belongsTo(surgerygModel, { as: 'surgery', foreignKey: 'surgery_id' })
// surgerygModel.hasMany(surgerytable, { as: 'surgery_table', foreignKey: 'surgery_id' })
module.exports = surgerygModel;