const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoriModel = require('./pill.model')
class dori_prixod_tableModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

dori_prixod_tableModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
prixod_id : {
    type: DataTypes.INTEGER,
},
price: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
count: {
  type: DataTypes.DECIMAL,
  allowNull: false
},
summa:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
dori_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},

}, {
  sequelize,
  modelName: 'dori_prixod_table',
  tableName: 'dori_prixod_table',
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
dori_prixod_tableModel.belongsTo(DoriModel, {as: 'pill', foreignKey: 'dori_id'})
module.exports = dori_prixod_tableModel;