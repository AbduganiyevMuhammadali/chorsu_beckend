const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const reagentModel = require('./reagent.model');
const reagentDepartmentModel = require('./reagent_department.model');
class register_reagentModel extends Model {} 

register_reagentModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
reagent_id : {
    type: DataTypes.INTEGER,
    allowNull: false
},
price: {
    type: DataTypes.DECIMAL(17, 3),
    allowNull: false
},
count: {
  type: DataTypes.DECIMAL(17, 3),
  allowNull: false
},
summa:{
  type: DataTypes.DECIMAL(17, 3),
  allowNull: false
},
doc_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
date_time:{
  type: DataTypes.INTEGER,
  allowNull: false
},
doc_type:{
  type: DataTypes.STRING
},
type:{
  type: DataTypes.INTEGER,
},
sereis_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
reg_inspection_key: {
  type: DataTypes.STRING,
  allowNull: true
},
reg_inspection_child_id: {
  type: DataTypes.INTEGER,
  allowNull: true
},
ins_cat_id: {
  type: DataTypes.INTEGER,
  allowNull: true
},
inspection_id: {
  type: DataTypes.INTEGER,
  allowNull: true
}
}, {
  sequelize,
  modelName: 'register_reagent',
  tableName: 'register_reagent',
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
register_reagentModel.belongsTo(reagentModel, {as:'reagent', foreignKey: 'reagent_id'});
register_reagentModel.belongsTo(reagentDepartmentModel, {as:'reagent_department', foreignKey: 'reagent_id'});
module.exports = register_reagentModel;