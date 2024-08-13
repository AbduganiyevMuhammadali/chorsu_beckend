const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const med_directModel = require('./med_direct.model');
class register_med_directModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

register_med_directModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 type: {
   type: DataTypes.STRING(400)
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 direct_id:{
  type: DataTypes.INTEGER
},
doc_type: {
  type: DataTypes.STRING()
},
comment:{
  type: DataTypes.STRING()
},
place:{
  type: DataTypes.STRING()
}

}, {
  sequelize,
  modelName: 'register_med_direct',
  tableName: 'register_med_direct',
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
register_med_directModel.belongsTo(med_directModel, {as: 'med_direct', foreignKey: 'direct_id'})
module.exports = register_med_directModel;