const Screens = require("../models/Screens");

const ScreenController = {
    createScreen: async (req, res) => {
        const screenData = req.body;
        try {
            const newScreen = await Screens.insertScreen(screenData);
            res.status(201).json({ status: "SUCCESS", message: 'Screen created successfully', data: newScreen });
        } catch (error) {
            console.error('Error inserting screen:', error);
            res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    getScreensByTheaterId: async (req, res) => {
        const { theaterId } = req.params;
        try {
            const screens = await Screens.getScreensByTheaterId(theaterId);
            res.status(200).json({ status: "SUCCESS", data: screens });
        } catch (error) {
            res.status(404).json({ status: "FAILED", message: error.message });
        }
    },

    updateScreen: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedScreen = await Screens.updateScreen(id, updatedData);
            res.status(200).json({ status: "SUCCESS", message: 'Screen updated successfully', data: updatedScreen });
        } catch (error) {
            res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    deleteScreen: async (req, res) => {
        const { id } = req.params;
        try {
            await Screens.deleteScreen(id);
            res.status(200).json({ status: "SUCCESS", message: 'Screen deleted successfully' });
        } catch (error) {
            res.status(400).json({ status: "SUCCESS", message: error.message });
        }
    }
};

module.exports = ScreenController;