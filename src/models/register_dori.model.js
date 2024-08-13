const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoriModel = require('./pill.model');
// const reagentModel = require('./reagent.model');
const reagentDepartmentModel = require('./reagent_department.model');
class register_doriModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

register_doriModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
dori_id : {
    type: DataTypes.INTEGER,
    allowNull: false
},
price: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
count: {
  type: DataTypes.DECIMAL,
  allowNull: false
},
summa:{
  type: DataTypes.DECIMAL,
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
series_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
parent_id:{
  type: DataTypes.INTEGER,
  allowNull:true
}

}, {
  sequelize,
  modelName: 'register_dori',
  tableName: 'register_dori',
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
register_doriModel.belongsTo(DoriModel, {as:'pill', foreignKey: 'dori_id'});
// register_reagentModel.belongsTo(reagentDepartmentModel, {as:'reagent_department', foreignKey: 'reagent_id'});
module.exports = register_doriModel;