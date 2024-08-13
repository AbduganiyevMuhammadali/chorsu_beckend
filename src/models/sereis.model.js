const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const user = require('./user.model')
// const surgerytable = require('./surgery_doctor');
// const RegistrationModel = require('./registration.model')
const ReagentModel = require('./reagent.model');


class surgerygModel extends Model {}

surgerygModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  reagent_id: {
    type: DataTypes.INTEGER
  },
  date_time:{
    type: DataTypes.DECIMAL
  },
  price:{
    type: DataTypes.DECIMAL,
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'sereis',
  tableName: 'sereis',
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
surgerygModel.belongsTo(ReagentModel, { as: 'reagent', foreignKey: 'reagent_id' })
// surgerygModel.belongsTo(surgeryParentModel, { as: 'parent', foreignKey: 'parent_id' })
// surgerytable.belongsTo(surgerygModel, { as: 'surgery', foreignKey: 'surgery_id' })
// surgerygModel.hasMany(surgerytable, { as: 'surgery_table', foreignKey: 'surgery_id' })
module.exports = surgerygModel;