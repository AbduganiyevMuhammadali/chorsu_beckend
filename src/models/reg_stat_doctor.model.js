const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const reg_stat_doctor_textModal  = require('./reg_stat_doctor_text.model');
const DoctorModel = require('./doctor.model');
class reg_stat_doctorModal extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

reg_stat_doctorModal.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  statsionar_text: {
    type: DataTypes.TEXT
  },
  text:{
    type: DataTypes.TEXT
  },
  reg_stat_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reg_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'reg_statsionar_doctor',
  tableName: 'reg_statsionar_doctor',
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

reg_stat_doctorModal.hasMany(reg_stat_doctor_textModal, { as: 'reg_stat_doctor_text', foreignKey: 'parent_id' })
reg_stat_doctorModal.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
module.exports = reg_stat_doctorModal;