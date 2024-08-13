const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const user = require('./user.model')
const surgerytable = require('./suergery.register')
// const RegistrationModel = require('./registration.model')
class surgeryDoctorModel extends Model {
  toJSON() {//Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

surgeryDoctorModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name:{
    type: DataTypes.STRING,
    notNull: true
  },
  registration_id: {
    type: DataTypes.INTEGER
  },
  doctor_id: {
    type: DataTypes.INTEGER
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
  price: {
    type: DataTypes.DECIMAL,
  },
  parent_id: {
    type: DataTypes.INTEGER,
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  vazvrat: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  modelName: 'surgery_doctor',
  tableName: 'surgery_doctor',
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
// surgeryDoctorModel.belongsTo(user, { as: 'user', foreignKey: 'user_id' })
// surgerytable.belongsTo(surgeryDoctorModel, { as: 'surgery', foreignKey: 'surgery_registration_id' })
// surgeryDoctorModel.belongsTo(RegistrationModel, { as: 'surgery_category', foreignKey: 'registration_id' })
// surgeryDoctorModel.hasMany(surgerytable, { as: 'surgeryTable', foreignKey: 'surgery_registration_id' })
surgerytable.hasMany(surgeryDoctorModel, { as: 'surgery_doctor', foreignKey: 'parent_id'})

module.exports = surgeryDoctorModel;