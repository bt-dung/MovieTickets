const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');
const Screens = require("./Screens");
const Movies = require("./Movies");
const Showtime = sequelize.define('showtimes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'movies',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    screen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'screens',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    date_time: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'showtimes',
    timestamps: false,
});
Movies.hasMany(Showtime, { foreignKey: 'movie_id' });
Showtime.belongsTo(Movies, { foreignKey: 'movie_id' })
Showtime.belongsTo(Screens, { foreignKey: 'screen_id' })

Showtime.getMovieName = async function (showtime_id) {
    try {
        const showtime = await Showtime.findOne({
            where: { id: showtime_id },
            include: {
                model: Movies,
                attributes: ['title'],
            },
        });
        console.log(showtime);
        if (!showtime || !showtime.movie) {
            throw new Error('Showtime or Movie no exist!');
        }

        return showtime;
    } catch (error) {
        console.error("❌ Error when gets title Movie:", error.message);
        throw error;
    }
};
Showtime.insertShowtime = async (showtimeData) => {
    try {
        const existingShowtimes = await Showtime.findAll({
            where: {
                screen_id: showtimeData.screen_id,
                [Op.or]: [
                    {
                        start_time: {
                            [Op.lt]: showtimeData.end_time
                        },
                        end_time: {
                            [Op.gt]: showtimeData.start_time
                        }
                    }
                ]
            }
        });

        if (existingShowtimes.length === 0) {
            const newShowtime = await Showtime.create(showtimeData);
            return newShowtime;
        }
        else {
            console.log(`Showtime alredy exists at: ${showtimeData.start_time}`);
            throw new Error(`Showtime alredy exists at: ${showtimeData.start_time}`);
        }
    } catch (error) {
        throw error;
    }
};

Showtime.getShowtimebyTheater = async (theater_id, dateTime, page, limit) => {
    try {
        const screen = await Screens.findAll({ where: { theater_id: theater_id }, attributes: ['id'] });
        const screenIds = screen.map(screen => screen.id);
        const totalShowtimes = await Showtime.count({
            where: {
                screen_id: { [Op.in]: screenIds },
                date_time: { [Op.startsWith]: dateTime }
            }
        });
        const showtimes = await Showtime.findAll({
            where: { screen_id: { [Op.in]: screenIds }, date_time: { [Op.startsWith]: dateTime } },
            include: [
                {
                    model: Movies,
                    attributes: ['title'],
                },
                {
                    model: Screens,
                    attributes: ['name'],
                }
            ],
            offset: page * limit,
            limit: limit,
        });
        return { showtimes, totalShowtimes };
    } catch (error) {
        console.error("Error fetching showtime by TheaterId:", error);
        throw error;
    }
};

Showtime.updateShowtime = async (id, updateData) => {
    try {
        const showtime = await Showtime.findByPk(id);
        if (!showtime) {
            throw new Error(`Screen not found with id: ${id}`);
        }
        await showtime.update(updateData);
        return showtime;
    } catch (error) {
        console.error("Error updating screen:", error);
        throw error;
    }
};

Showtime.deleteShowtime = async (id) => {
    try {
        const deletedRows = await Showtime.destroy({
            where: { id },
        });
        return deletedRows;
    } catch (error) {
        throw error;
    }
};

module.exports = Showtime;