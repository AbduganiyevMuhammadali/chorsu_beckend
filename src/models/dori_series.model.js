const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const user = require('./user.model')
// const surgerytable = require('./surgery_doctor');
// const RegistrationModel = require('./registration.model')
const DoriModel = require('./pill.model');


class DoriSeriesModel extends Model {}

DoriSeriesModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  dori_id: {
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
  modelName: 'dori_series',
  tableName: 'dori_series',
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
DoriSeriesModel.belongsTo(DoriModel, { as: 'pill', foreignKey: 'dori_id' })
// surgerygModel.belongsTo(surgeryParentModel, { as: 'parent', foreignKey: 'parent_id' })
// surgerytable.belongsTo(surgerygModel, { as: 'surgery', foreignKey: 'surgery_id' })
// surgerygModel.hasMany(surgerytable, { as: 'surgery_table', foreignKey: 'surgery_id' })
module.exports = DoriSeriesModel;