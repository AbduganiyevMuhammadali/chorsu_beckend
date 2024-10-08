const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const UserModel = require('./user.model');
class RoomModel extends Model {}

RoomModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'room',
  tableName: 'room',
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
// RoomModel.hasMany(UserModel, {as: 'users', foreignKey: 'room_id'});
module.exports = RoomModel;