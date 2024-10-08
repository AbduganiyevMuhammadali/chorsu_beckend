const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const pastavchikModel = require('./pastavchik.model');
const prixod_dori_tableModel = require('./prixod_dori_table.model');
class prixod_doriModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

prixod_doriModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
date_time : {
    type: DataTypes.INTEGER,
},
umumiy_summa: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
pastavchik_id: {
  type: DataTypes.INTEGER,
  allowNull: false
},
comment:{
  type: DataTypes.STRING
}

}, {
  sequelize,
  modelName: 'prixod_dori',
  tableName: 'prixod_dori',
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
prixod_doriModel.hasMany(prixod_dori_tableModel, {as: 'dori_prixod_table', foreignKey: 'prixod_id'})
prixod_doriModel.belongsTo(pastavchikModel, {as: 'pastavchik', foreignKey: 'pastavchik_id'})
module.exports = prixod_doriModel;