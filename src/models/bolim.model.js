const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorCategory = require('../models/doctor_category.model')
class bolimModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

bolimModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(600),
    allowNull: false
},
direct_precent:{
  type: DataTypes.DECIMAL,
  allowNull: false
}

}, {
  sequelize,
  modelName: 'bolim',
  tableName: 'bolim',
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
// DoctorCategory.belongsTo(bolimModel, {as: 'doctor_category', foreignKey: 'bolim_id'})

module.exports = bolimModel;