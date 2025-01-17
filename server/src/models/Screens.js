const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db')

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
    }, total_row: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    total_column: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    tableName: 'screens',
    timestamps: false,
});

Screens.insertScreen = async (screenData) => {
    try {
        const existingScreen = await Screens.findOne({ where: { name: screenData.name, theater_id: screenData.theater_id } });
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

Screens.getScreensByTheaterId = async (theater_id) => {
    try {
        const screens = await Screens.findAll({
            where: { theater_id: theater_id }
        });
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
        await Screens.runHooks("afterUpdate", screen);
        return screen;
    } catch (error) {
        console.error("Error updating screen:", error);
        throw error;
    }
};

Screens.deleteScreen = async (id) => {
    try {
        const screen = await Screens.findByPk(id);
        if (!screen) {
            throw new Error('Screen not found');
        }

        const deletedRowsCount = await Screens.destroy({
            where: { id: id }
        });
        await Screens.runHooks('afterDestroy', screen);

        return deletedRowsCount;
    } catch (error) {
        console.error("Error deleting screen:", error);
        throw error;
    }
};

Screens.afterCreate(async (screen, options) => {
    const Theaters = sequelize.models.theaters;
    console.log(Theaters)
    try {
        const theater = await Theaters.findByPk(screen.theater_id);
        if (theater) {
            console.log(theater.id);
            theater.total_screens += 1;
            const totalSeats = screen.total_row * screen.total_column;
            theater.total_seats = (theater.total_seats || 0) + totalSeats;
            await theater.save();
        }
    } catch (error) {
        console.error('Error updating theater after screen creation:', error);
    }
});

Screens.afterUpdate(async (screen, options) => {
    const Theaters = sequelize.models.theaters;
    try {
        const theater = await Theaters.findByPk(screen.theater_id);
        if (theater) {
            const screens = await Screens.findAll({ where: { theater_id: screen.theater_id } });
            const totalSeats = screens.reduce((sum, s) => sum + (s.total_row * s.total_column), 0);

            theater.total_seats = totalSeats;
            await theater.save();
        }
    } catch (error) {
        console.error('Error updating theater after screen update:', error);
    }
});

Screens.afterDestroy(async (screen, options) => {
    const Theaters = sequelize.models.theaters;
    try {
        const theater = await Theaters.findByPk(screen.theater_id);
        if (theater) {
            theater.total_screens -= 1;
            const totalSeats = screen.total_row * screen.total_column;
            theater.total_seats = (theater.total_seats || 0) - totalSeats;
            await theater.save();
        }
    } catch (error) {
        console.error('Error updating theater after screen deletion:', error);
    }
});


module.exports = Screens;
