const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const reg_stat_doctorModal = require('./reg_stat_doctor.model')
class reg_statsionarModal extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

reg_statsionarModal.init({
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
  reg_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  arrive_day: {
    type: DataTypes.INTEGER
  },
  recede_day: {
    type: DataTypes.INTEGER
  }

}, {
  sequelize,
  modelName: 'reg_statsionar',
  tableName: 'reg_statsionar',
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

reg_statsionarModal.hasMany(reg_stat_doctorModal, { as: 'reg_statsionar_doctor', foreignKey: 'reg_stat_id' })
// reg_statsionarModal.hasMany(reg_)
module.exports = reg_statsionarModal;