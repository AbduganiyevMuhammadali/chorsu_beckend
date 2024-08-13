const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const UserModel = require('./user.model');
class registerUserModel extends Model {} 

registerUserModel.init({
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
 user_id:{
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
},
pay_type:{
  type: DataTypes.STRING(400)
 },
 summa_type: {
  type: DataTypes.DECIMAL()
 }

}, {
  sequelize,
  modelName: 'register_user',
  tableName: 'register_user',
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

registerUserModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' })

module.exports = registerUserModel;