const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorCategory = require('../models/doctor_category.model');
const UserModel = require('../models/user.model');
const bolimModel = require('./bolim.model');
class DoctorModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

DoctorModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  category_id:{
    type: DataTypes.INTEGER
  },
  bolim_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'doctor',
  tableName: 'doctor',
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
DoctorModel.belongsTo(DoctorCategory, {as: 'doctor_category', foreignKey: 'category_id'});
DoctorModel.belongsTo(bolimModel, {as: 'bolim', foreignKey: 'bolim_id'});
module.exports = DoctorModel;