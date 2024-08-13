const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const bolimModel = require('./bolim.model');
class Doctor_categoryModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Doctor_categoryModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  citizen_price:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  bolim_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'doctor_category',
  tableName: 'doctor_category',
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
Doctor_categoryModel.belongsTo(bolimModel, {as: 'bolim', foreignKey: 'bolim_id'})
bolimModel.hasMany(Doctor_categoryModel, {as: 'doctor_category', foreignKey: 'bolim_id'});
module.exports = Doctor_categoryModel;