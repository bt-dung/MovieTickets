const Screens = require("../models/Screens");
const createSeat = require("../config/createSeat");
const updateSeats = require("../config/updateSeat");
const detroySeat = require("../config/detroySeat");

const ScreenController = {
    createScreen: async (req, res) => {
        const screenData = req.body;
        try {
            const newScreen = await Screens.insertScreen(screenData);
            const { total_row, total_column } = screenData;
            await createSeat({
                rows: total_row,
                columns: total_column,
                screen_id: newScreen.id,
                seat_type_id: 1,
            });
            return res.status(201).json({ status: "SUCCESS", message: 'Screen created successfully', data: newScreen });
        } catch (error) {
            console.error('Error inserting screen:', error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    getScreenbyId: async (req, res) => {
        const { id } = req.params;
        try {
            const screen = await Screens.findByPk(id);
            return res.json(screen);
        } catch (error) {
            console.error("Fetching screen error:", error);
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },

    getScreensByTheaterId: async (req, res) => {
        const { theaterId } = req.params;
        try {
            const screens = await Screens.getScreensByTheaterId(theaterId);
            return res.status(200).json({ status: "SUCCESS", data: screens });
        } catch (error) {
            return res.status(404).json({ status: "FAILED", message: error.message });
        }
    },

    updateScreen: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedScreen = await Screens.updateScreen(id, updatedData);
            await updateSeats({
                screen_id: updatedScreen.id,
                rows: updatedData.total_row,
                columns: updatedData.total_column,
                seat_type_id: 1,
            });

            return res.status(200).json({ status: "SUCCESS", message: 'Screen updated successfully', data: updatedScreen });
        } catch (error) {
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    deleteScreen: async (req, res) => {
        const { id } = req.params;
        try {
            await detroySeat(id);
            await Screens.deleteScreen(id);
            return res.status(200).json({ status: "SUCCESS", message: 'Screen deleted successfully' });
        } catch (error) {
            console.error("Error while delete Screen: ", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    getScreenById: async (req, res) => {
        const {id} = req.params;
        try {
            const screen = await Screens.findOne({where: {id: id}});
            return screen
        } catch (error) {
            console.error("Error while delete Screen: ", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    }
};

module.exports = ScreenController;