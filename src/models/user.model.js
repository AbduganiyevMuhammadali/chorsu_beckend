const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const RoomModel  = require('../models/room.model')
const DoctorModel = require('../models/doctor.model')
const inspection_categoryModel  = require('../models/inspector_category.model');
const Registration_doctorModel = require('./registration_doctor.model');
const ComeGetBackModel = require('../models/comegetback.model');
const UserPenaltyBonusModel = require('../models/userpenaltybonus.model');

const inspectionModel = require('./inspection.model');
class UserModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

UserModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING(100), 
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  token:{
    type: DataTypes.STRING(100),
    allowNull: false
  },
  room_id:{
    type: DataTypes.INTEGER,
    // allowNull: false
  },
  doctor_id:{
    type: DataTypes.INTEGER
  },
  inspection_category_id:{
    type: DataTypes.INTEGER
  },
  pay_type:{
    type: DataTypes.STRING(),
    allowNull: true
  },
  salary:{
    type: DataTypes.DECIMAL(), 
    allowNull: true
  },
  percent:{
    type: DataTypes.DECIMAL()
  },
  palata_percent: {
    type: DataTypes.DECIMAL()
  },
  come_time: {
    type: DataTypes.TIME,
  },
  leave_time: {
    type: DataTypes.TIME,
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user',
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
  // findOne da yoki findAll da chaqirish kerak
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] },
    }
  }
});

UserModel.belongsTo(RoomModel, { as: 'Room', foreignKey: 'room_id'})
RoomModel.hasMany(UserModel, {as: 'users', foreignKey: 'room_id'});
UserModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
UserModel.belongsTo(inspection_categoryModel, {as: 'inspecton', foreignKey: 'inspection_category_id'});
UserModel.hasMany(Registration_doctorModel, {as: 'registration_doctor', foreignKey: 'doctor_id'})
inspectionModel.belongsTo(UserModel, {as: 'User', foreignKey: 'user_id'})
UserModel.hasMany(ComeGetBackModel, { as: 'come_doc', foreignKey: 'user_id' });
UserModel.hasMany(UserPenaltyBonusModel, { as: 'penalty_bonus', foreignKey: 'user_id' });

module.exports = UserModel;