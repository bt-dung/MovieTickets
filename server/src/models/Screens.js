const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db')
const Theaters = require("./Theater")
const Screens = sequelize.define('screens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'theaters',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },

}, {
    tableName: 'screens',
    timestamps: false,
});

Screens.insertScreen = async (screenData) => {
    try {
        const existingScreen = await Screens.findOne({ where: { name: screenData.name } });
        if (!existingScreen) {
            const newScreen = await Screens.create(screenData);
            return newScreen;
        } else {
            console.log(`Screens already exists: ${screenData.name}`);
            throw new Error(`Screen already exists with name: ${screenData.name}`);
        }
    } catch (error) {
        console.error("Error inserting screen:", error);
        throw error;
    }
};

Screens.getScreensByTheaterId = async (theaterId) => {
    try {
        const screens = await Screens.findAll({
            where: { theater_id: theaterId }
        });
        console.log(screens);
        if (!screens || screens.length === 0) {
            throw new Error(`No screens found for TheaterId: ${theaterId}`);
        }
        return screens;
    } catch (error) {
        console.error("Error fetching screens by TheaterId:", error);
        throw error;
    }
};

Screens.updateScreen = async (id, updateData) => {
    try {
        const screen = await Screens.findByPk(id);
        if (!screen) {
            throw new Error(`Screen not found with id: ${id}`);
        }
        await screen.update(updateData);
        return screen;
    } catch (error) {
        console.error("Error updating screen:", error);
        throw error;
    }
};

Screens.deleteScreen = async (id) => {
    try {
        const deletedRowsCount = await Screens.destroy({
            where: { id: id }
        });

        if (deletedRowsCount === 0) {
            throw new Error('Screen  not found');
        }

        return deletedRowsCount;
    } catch (error) {
        console.error("Error deleting screen:", error);
        throw error;
    }
};

Screens.afterCreate(async (screen, options) => {
    const theater = await Theaters.findByPk(screen.theater_id);
    if (theater) {
        theater.total_screens = theater.total_screens + 1;
        await theater.save();
    }
});

Screens.afterDestroy(async (screen, options) => {
    const theater = await Theaters.findByPk(screen.theater_id);
    if (theater) {
        theater.total_screens = theater.total_screens - 1;
        await theater.save();
    }
});


module.exports = Screens;
