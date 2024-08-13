const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const palata_categoryModel = require('../models/palata_category.model')
const PalataModel = require('./palata.model')
class xona_etajModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

xona_etajModel.init({
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
category_id:{
  type: DataTypes.INTEGER,
  allowNull: false
}

}, {
  sequelize,
  modelName: 'xona_etaj',
  tableName: 'xona_etaj',
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
xona_etajModel.belongsTo( palata_categoryModel, {as: 'palata_category', foreignKey: 'category_id'})
palata_categoryModel.hasMany(xona_etajModel, { as: 'xona', foreignKey: 'category_id' })
xona_etajModel.hasMany(PalataModel, { as: 'palata', foreignKey: 'room_id' })
PalataModel.belongsTo(xona_etajModel, { as: 'xona', foreignKey: 'room_id' })
module.exports = xona_etajModel;