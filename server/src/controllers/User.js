const User = require('../models/User');

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
    try {
        const data = await User.findAll();
        return res.json(data);
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: 'An error occurred while gets all the user',
            error: error.message
        });
    };
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedUser = await User.update(id, data);

        return res.status(200).json({
            message: 'User  updated successfully',
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
    const userId = req.params.id;
    try {
        const deletedCount = await User.destroy(userId);
        return res.status(200).json({
            message: 'User  deleted successfully',
            deletedCount: deletedCount
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            message: 'An error occurred while deleting the user',
            error: error.message
        });
    }
};


module.exports = { getUser, updateUser, deleteUser, getAllUser }
