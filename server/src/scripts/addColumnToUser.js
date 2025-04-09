const { sequelize } = require("../database/db");
const { DataTypes } = require('sequelize');

async function addGenderColumn() {
    const queryInterface = sequelize.getQueryInterface();

    try {
        await queryInterface.addColumn('users', 'createdAt', {
            type: DataTypes.DATE,
            allowNull: true,
        });
        console.log('Added gender column to users table');
    } catch (error) {
        console.error(' Failed to add column:', error);
    }
}

addGenderColumn();