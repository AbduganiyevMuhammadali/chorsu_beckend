const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const xona_etajModel = require('./xona_etaj.model')
class palata_categoryModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

palata_categoryModel.init({
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(600),
    allowNull: false
}

}, {
  sequelize,
  modelName: 'palata_category',
  tableName: 'palata_category',
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
// palata_categoryModel.belongsTo(xona_etajModel, {as: 'palata_category', foreignKey: 'palata_id'})
module.exports = palata_categoryModel;