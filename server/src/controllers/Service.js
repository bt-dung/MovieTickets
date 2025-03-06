const Service = require("../models/Service");

const ServiceController = {
    createService: async (req, res) => {
        const { name, img, category, inventory, price, discount, description } = req.body;
        if (!name || !img || !category || !inventory || !price) {
            return res.status(404).json({ status: "FAILED", message: "All fields are required!!" })
        }
        const ServiceData = {
            name, img, category, inventory, price, discount, description
        };
        if (description) {
            ServiceData.description = description;
        }
        try {
            const newService = await Service.createService(ServiceData);
            return res.status(201).json({ status: "SUCCESS", message: 'Service created successfully!', data: newService });
        } catch (error) {
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },

    getAllService: async (req, res) => {
        try {
            const services = await Service.readAllService();
            return res.json(services);
        } catch (error) {
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },
    getServiceById: async (req, res) => {
        try {
            const { id } = req.params;
            const service = await Service.readOneService(id);
            return res.json({ status: "SUCCESS", data: service });
        } catch (error) {
            return res.status(400).json({ status: "FAILED", message: error.message });
        }

    },
    updateService: async (req, res) => {
        const updateData = req.body;
        const { id } = req.params;
        try {
            const updatedService = await Service.updateService(id, updateData);
            return res.status(200).json({
                status: "SUCCESS",
                message: 'User updated successfully',
                service: updatedService
            });
        } catch (error) {
            console.error('Error updating service :', error);
            return res.status(500).json({
                status: "FAILED",
                message: 'An error occurred while updating the service.',
                error: error.message
            });
        }
    },
    deleteService: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedCount = await Service.deleteService(id);
            return res.status(200).json({
                status: "SUCCESS",
                message: 'Service  deleted successfully',
                deletedCount: deletedCount
            });
        } catch (error) {
            console.error('Error deleting service:', error);
            return res.status(500).json({
                status: "FAILED",
                message: 'An error occurred while deleting the service',
                error: error.message
            });
        }
    }
};
module.exports = ServiceController;