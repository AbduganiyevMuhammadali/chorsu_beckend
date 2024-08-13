const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const UserModel = require('./user.model');
const ManualRasxodReagentChildModel = require('./manual_rasxod_reagent_child.model');

class ManualRasxodReagentModel extends Model {}

ManualRasxodReagentModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  datetime: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  ins_cat_id: {
    type: DataTypes.INTEGER,
  },
  all_count: {
    type: DataTypes.DECIMAL(17, 3),
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'manual_rasxod_reagent',
  tableName: 'manual_rasxod_reagent',
  timestamps: false
});


ManualRasxodReagentModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' })
ManualRasxodReagentModel.hasMany(ManualRasxodReagentChildModel, { as: 'childs', foreignKey: 'parent_id' })
module.exports = ManualRasxodReagentModel;