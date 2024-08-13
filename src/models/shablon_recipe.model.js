const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const pillModel = require('./pill.model')
class Shablon_recipeModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Shablon_recipeModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
//registration_doctor id
  parent_id: {
    type: DataTypes.INTEGER,
  },
  doctor_id: {
    type: DataTypes.INTEGER
  },
  pill_id : {
    type: DataTypes.INTEGER
  },
  time:{
    type: DataTypes.INTEGER
  },
  day:{
    type: DataTypes.INTEGER
  },
  comment:{
    type: DataTypes.STRING,
  },
  name:{
    type: DataTypes.STRING()
  }
}, {
  sequelize,
  modelName: 'shablon_recipe',
  tableName: 'shablon_recipe',
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
Shablon_recipeModel.belongsTo(pillModel, {as: 'pill', foreignKey: 'pill_id'})
module.exports = Shablon_recipeModel;