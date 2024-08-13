const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class InspectionReagentCalcModel extends Model {}

InspectionReagentCalcModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    inspection_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inspection_child_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reagent_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    count: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    doc_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'InspectionReagentCalcModel',
    tableName: 'inspection_reagent_calc',
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
});

module.exports = InspectionReagentCalcModel;