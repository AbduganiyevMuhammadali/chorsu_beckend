const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class ManualRasxodReagentChildModel extends Model {}

ManualRasxodReagentChildModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reagent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ins_cat_id: {
    type: DataTypes.INTEGER,
  },
  count: {
    type: DataTypes.DECIMAL(17, 3),
    defaultValue: 0
  },
  balance: {
    type: DataTypes.DECIMAL(17, 3),
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'manual_rasxod_reagent_child',
  tableName: 'manual_rasxod_reagent_child',
  timestamps: false
});


module.exports = ManualRasxodReagentChildModel;