const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
class surgeryCategoryModel extends Model {
  toJSON() {//Api da ishladi
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

surgeryCategoryModel.init({
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
  price: {
    type: DataTypes.DECIMAL(17, 3),
    allowNull: true
  },
  citizen_price: {
    type: DataTypes.DECIMAL(17, 3),
    allowNull: true
  },
  doctor_id:{
    type: DataTypes.INTEGER
  },
  percent: {
    type: DataTypes.DECIMAL(17, 3),
  },
}, {
  sequelize,
  modelName: 'surgery_category',
  tableName: 'surgery_category',
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
// surgeryCategoryModel.belongsTo(surgery, { as: 'surgery', foreignKey: 'surgery_id' })
// surgeryCategoryModel.hasMany(surgery, { as: 'surgerys', foreignKey: 'surgery_id' })
surgeryCategoryModel.belongsTo(DoctorModel, { as: 'doctor', foreignKey: 'doctor_id' })
module.exports = surgeryCategoryModel;