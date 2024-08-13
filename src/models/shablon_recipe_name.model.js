const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const pillModel = require('./pill.model')
const shablon_recipeModel = require('./shablon_recipe.model');
class shablon_recipe_nameModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

shablon_recipe_nameModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  doctor_id: {
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING()
  }
}, {
  sequelize,
  modelName: 'shablon_recipe_name',
  tableName: 'shablon_recipe_name',
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
// shablon_recipe_nameModel.hasMany(pillModel, {as: 'pill', foreignKey: 'id'})
shablon_recipe_nameModel.hasMany(shablon_recipeModel, {as: 'shablon_recipe', foreignKey: 'parent_id'})
module.exports = shablon_recipe_nameModel;