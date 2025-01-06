const Theaters = require("../models/Theater");

const getTheater = async (req, res) => {
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

const createTheater = async (req, res) => {
    const { name, address, area_id, total_screens, total_seats, manager_id } = req.body;

    if (!name || !address || !area_id || !total_screens || !total_seats || !manager_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingTheater = await Theaters.findOne({ where: { name, address } });
        if (existingTheater) {
            return res.status(400).json({ message: `Theater with name '${name}' already exists.` });
        }

        const newTheater = await Theaters.create({
            name,
            address,
            area_id,
            total_screens,
            total_seats,
            manager_id
        });

        return res.status(201).json({
            status: "SUCCESS",
            message: 'Theater created successfully',
            data: newTheater
        });
    } catch (error) {
        console.error("Error creating theater:", error.message);
        return res.status(500).json({ message: 'Failed to create theater. Please try again.' });
    }
};

module.exports = { getTheater, createTheater };