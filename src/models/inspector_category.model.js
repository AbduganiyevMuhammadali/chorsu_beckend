const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspectionModel = require('./inspection.model');
class inspection_categoryModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

inspection_categoryModel.init({
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

}, {
  sequelize,
  modelName: 'inspection_category',
  tableName: 'inspection_category',
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
    {
      name: "user_name",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "user_name" },
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
inspectionModel.belongsTo(inspection_categoryModel, {as: 'inspector_category', foreignKey: 'category_id'})
// inspection_categoryModel.hasMany(inspectionModel, {as: 'inspection', foreignKey: 'category_id'})
module.exports = inspection_categoryModel;