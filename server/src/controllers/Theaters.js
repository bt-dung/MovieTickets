const Theaters = require("../models/Theater");

const getAllTheater = async (req, res) => {
    try {
        const theaters = await Theaters.findAll();
        return res.json({
            status: "SUCCESS",
            message: "FETCHED THEATERS DATA",
            data: theaters
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: 'An error occurred while gets all the theater!!',
            error: error.message
        });
    }
}

const getTheater = async (req, res) => {
    const { id } = req.params;
    try {
        const theater = await Theaters.findByPk(id);
        return res.json(theater);
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Cant find Theater",
            success: "FAILED",
        });
    }
}

const updateTheater = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedTheater = await Theaters.updateTheater(id, data);
        return res.status(200).json({
            status: "SUCCESS",
            message: 'User updated successfully',
            theater: updatedTheater
        });
    } catch (error) {
        console.error('Error updating theater:', error);
        return res.status(500).json({
            status: "FAILED",
            message: 'An error occurred while updating the theater.',
            error: error.message
        });
    }
}

const createTheater = async (req, res) => {
    try {
        const newTheater = await Theaters.insertTheater(req.body);
        return res.status(201).json({
            status: "SUCCESS",
            message: 'Theater created successfully',
            data: newTheater,
        });
    } catch (error) {
        console.error("Error creating theater:", error.message);
        return res.status(400).json({ status: "FAILED", message: error.message });
    }
};

const deleteTheater = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Theaters.deleteTheater(id);
        return res.status(200).json({
            status: "SUCCESS",
            message: 'Theater  deleted successfully',
            deletedCount: deletedCount
        });
    } catch (error) {
        console.error('Error deleting theater:', error);
        return res.status(500).json({
            status: "FAILED",
            message: 'An error occurred while deleting the theater',
            error: error.message
        });
    }
};

module.exports = { getAllTheater, getTheater, createTheater, updateTheater, deleteTheater };