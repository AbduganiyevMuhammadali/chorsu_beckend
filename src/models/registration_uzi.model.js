const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection = require('./inspection.model');
const inspection_categoryModel = require('./inspector_category.model');
const Registration_uzi_childModel = require('./registration_uzi_child.model');
class Registration_uziModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_uziModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  inspection_id: {
      type: DataTypes.INTEGER
  },
  user_id:{
    type: DataTypes.INTEGER
  },
  vazvrat: {
    type: DataTypes.BOOLEAN
},
  registration_id : {
      type: DataTypes.INTEGER
  },
  type:{
      type:DataTypes.BOOLEAN,
      allowNull: false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
//inspection_category
  category_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(200),
      allowNull: false
  },
  date_time:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  select:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  uzi:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  shablon:{
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  modelName: 'registration_uzi',
  tableName: 'registration_uzi',
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
// Registration_uziModel.hasMany(Registration_uzi_childModel, {as: 'registration_inspection_child', foreignKey: 'id'});
Registration_uziModel.belongsTo(inspection, {as: 'inspection', foreignKey: 'inspection_id'})
Registration_uziModel.hasMany(Registration_uzi_childModel, {as: 'registration_inspection_child', foreignKey: 'parent_id'})
Registration_uziModel.belongsTo(inspection_categoryModel, {as: 'category', foreignKey: 'category_id'})
// Registration_uziModel.hasMany(RegistrationModel, {as: 'registration', foreignKey: 'registration_id'})
module.exports = Registration_uziModel;