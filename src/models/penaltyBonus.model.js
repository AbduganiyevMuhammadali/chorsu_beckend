const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class PenaltyBonusModel extends Model {}

PenaltyBonusModel.init({ 
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  min_time: {
    type: DataTypes.INTEGER,
  },
  max_time: {
    type: DataTypes.INTEGER,
  },
  cause: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.STRING
  },
  summa: {
    type: DataTypes.DECIMAL(17, 3)
  }
}, {
  sequelize,
  modelName: 'penalties_and_bonus',
  tableName: 'penalties_and_bonus',
  timestamps: false,
  
});

module.exports = PenaltyBonusModel;