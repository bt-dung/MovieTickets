const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');
const SeatType = require("./SeatType");
const Seat = sequelize.define('seats', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    seat_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    screen_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'screens',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    seat_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'seat_type',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'seats',
    timestamps: false,
});
Seat.belongsTo(SeatType, { foreignKey: "seat_type_id" });
SeatType.hasMany(Seat, { foreignKey: "seat_type_id" });

Seat.insertSeat = async (seatData) => {
    try {
        const existingSeat = await Seat.findOne({ where: { seat_name: seatData.seat_name, screen_id: seatData.screen_id } });

        if (!existingSeat) {
            const newSeat = await Seat.create(seatData);
            return newSeat;
        } else {
            console.log(`Seat already exists: ${seatData.seat_name}`);
            throw new Error(`Seat already exists with name: ${seatData.seat_name}`);
        }
    } catch (error) {
        console.error("Error inserting seat:", error.message);
        throw error;
    }
};

Seat.getSeatbyScreenID = async (screen_id, showtime_id) => {
    const Tickets = sequelize.models.tickets;
    const Invoices = sequelize.models.invoices;
    try {
        const seats = await Seat.findAll({
            where: { screen_id: screen_id },
            order: [['id', 'ASC']],
            include: [
                {
                    model: Tickets,
                    where: { showtime_id: showtime_id },
                    required: false,
                    include: [
                        {
                            model: Invoices,
                            attributes: ['PaymentStatus'],
                            required: false
                        }
                    ]
                },
                {
                    model: SeatType,
                    required: true,
                }
            ],
        });
        return seats;
    } catch (error) {
        console.error("Error fetching seats by ScreenID:", error);
        throw error;
    }
};

Seat.fetchSeatById = async function (seatIds) {
    try {
        const seats = await Seat.findAll({
            where: {
                id: {
                    [Op.in]: seatIds,
                }
            },
            include: {
                model: SeatType,
                required: true,
            },
        });
        return seats;
    } catch (error) {
        throw error;
    }
};

module.exports = Seat;
