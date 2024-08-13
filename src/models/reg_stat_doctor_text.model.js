const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class reg_stat_doctor_textModal extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

reg_stat_doctor_textModal.init({
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
  parent_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  day: {
    type: DataTypes.DATE,
  },
  reg_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doctor_id: {
    type: DataTypes.INTEGER,
  }

}, {
  sequelize,
  modelName: 'reg_stat_doctor_text',
  tableName: 'reg_stat_doctor_text',
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
// reg_stat_doctor_textModal.belongsTo(DoctorCategory, {as: 'doctor_category', foreignKey: 'category_id'});
// reg_stat_doctor_textModal.belongsTo(bolimModel, {as: 'bolim', foreignKey: 'bolim_id'});
module.exports = reg_stat_doctor_textModal;