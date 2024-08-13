const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class palataModel extends Model {}

palataModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  price:{
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  room_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.VIRTUAL,
  },
  user_id: {
    type: DataTypes.VIRTUAL
  },
  total_price: {
    type: DataTypes.VIRTUAL,
  }
}, {
  sequelize,
  modelName: 'palata',
  tableName: 'palata',
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

// palataModel.hasMany(registration_palataModel, {as: 'registration_palata', foreignKey: 'palata_id'});
module.exports = palataModel;