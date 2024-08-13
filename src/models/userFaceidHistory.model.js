const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class userFaceidHistoryModel extends Model {} 

userFaceidHistoryModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
  },
  ipaddress: {
    type: DataTypes.STRING,
  },
  major: {
    type: DataTypes.INTEGER,
  },
  minor: {
    type: DataTypes.INTEGER,
  },
  time: {
    type: DataTypes.DATE,
  },
  cardType: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  cardReaderNo: {
    type: DataTypes.STRING,
  },
  doorNo: {
    type: DataTypes.INTEGER,
  },
  employeeNoString: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.INTEGER,
  },
  serialNo: {
    type: DataTypes.STRING,
  },
  userType: {
    type: DataTypes.STRING,
  },
  currentVerifyMode: {
    type: DataTypes.STRING,
  },
  mask: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  modelName: 'user_face_id_history',
  tableName: 'user_face_id_history',
  timestamps: false,
});

module.exports = userFaceidHistoryModel;