const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class reg_doctor_categoryArxiv extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

reg_doctor_categoryArxiv.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(),
    allowNull: false
},
price:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
doctor_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
reg_id:{
  type: DataTypes.INTEGER,
  allowNull: false
}

}, {
  sequelize,
  modelName: 'reg_doctor_category_arxiv',
  tableName: 'reg_doctor_category_arxiv',
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
module.exports = reg_doctor_categoryArxiv;