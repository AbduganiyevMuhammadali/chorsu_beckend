const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class A4ImagesModel extends Model {} 

A4ImagesModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    image_name: {
        type: DataTypes.STRING,
    },
    key: {
        type: DataTypes.STRING,
    }
    },
    {
        sequelize,
        modelName: 'a4_images',
        tableName: 'a4_images',
        timestamps: false
    }
);

module.exports = A4ImagesModel;