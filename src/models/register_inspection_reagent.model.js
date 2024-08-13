const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const Reagent = require('./reagent.model');
class RegisterInspectionReagent extends Model {}

RegisterInspectionReagent.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    datetime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    doc_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    doc_type: {
        type: DataTypes.STRING,
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
    }
  },
  {
    sequelize,
    modelName: 'RegisterInspectionReagent',
    tableName: 'register_inspection_reagent',
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

RegisterInspectionReagent.belongsTo(Reagent, { as: 'reagent', foreignKey: 'reagent_id' })

module.exports = RegisterInspectionReagent;