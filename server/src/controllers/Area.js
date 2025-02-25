const Area = require('../models/Area')

const getArea = async (req, res) => {
    try {
        const areas = await Area.findAll();
        return res.json({
            status: "SUCCESS",
            message: "FETCHED AREAS DATA",
            data: areas
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: 'An error occurred while gets all the area!!',
            error: error.message
        });
    }
}

module.exports = { getArea };