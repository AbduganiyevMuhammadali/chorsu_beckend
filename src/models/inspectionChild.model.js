const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const InspectionReagentCalcModel = require('./inspection_reagent_calc.model');
class inspectionChildModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

inspectionChildModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
norm : {
    type: DataTypes.TEXT()
},
parent_id : {
    type: DataTypes.INTEGER,
},
price:{
    type:DataTypes.DECIMAL()
},
price:{
  type:DataTypes.DECIMAL()
},
citizen_price:{
  type:DataTypes.DECIMAL()
},
name: {
    type: DataTypes.STRING(200),
},
file: {
    type: DataTypes.STRING,
},
status: {
  type: DataTypes.VIRTUAL
},
select:{
  type: DataTypes.STRING
}

}, {
  sequelize,
  modelName: 'inspectionChild',
  tableName: 'inspectionChild',
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
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password_hash'] },
    }
  }
});


inspectionChildModel.hasMany(InspectionReagentCalcModel, { as: 'reagents', foreignKey: 'inspection_child_id' })

module.exports = inspectionChildModel;