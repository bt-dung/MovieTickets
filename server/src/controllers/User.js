const User = require('../models/User');
const { Op } = require("sequelize");
const getUser = async (req, res) => {
    const { id } = req.params;
    console.log('userId:', id)
    try {
        const user = await User.findByPk(id);
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        return res.json({
            message: "Cant find User",
            success: false,
        });
    }
};

const getAllUser = async (req, res) => {
    const page = parseInt(req.query.pageNumber);
    const limit = parseInt(req.query.limit);
    const search = req.query.search || "";
    console.log(search);

    const whereCondition = search
        ? {
            name: {
                [Op.like]: `%${search}%`
            }
        }
        : {};
    try {
        const totalUsers = await User.count({ where: whereCondition });
        const totalPages = Math.ceil(totalUsers / limit);
        const data = await User.findAll({
            where: whereCondition,
            offset: page * limit,
            limit: limit,
        });
        return res.json({ content: data, totalPages });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: 'An error occurred while gets all the user',
            error: error.message
        });
    };
};

const getManagers = async (req, res) => {
    try {
        const managers = await User.findAll({
            where: {
                role_id: 2
            }
        });
        return res.status(200).json(managers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while fetching managers data!!!' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedUser = await User.updateUser(id, data);
        return res.status(200).json({
            status: "SUCCESS",
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            message: 'An error occurred while updating the user',
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await User.deleteUser(id);
        return res.status(200).json({
            status: "SUCCESS",
            message: 'User  deleted successfully',
            deletedCount: deletedCount
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            status: "FAILED",
            message: 'An error occurred while deleting the user',
            error: error.message
        });
    }
};


module.exports = { getUser, updateUser, deleteUser, getAllUser, getManagers }
