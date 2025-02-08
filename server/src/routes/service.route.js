const express = require('express');
const router = express.Router();
const ServiceController = require("../controllers/Service");
router.post("/create-service", ServiceController.createService)
    .get("/services", ServiceController.getAllService)
    .get("/service/:id", ServiceController.getServiceById)
    .patch("/service/:id/update", ServiceController.updateService)
    .delete("/service/:id/delete", ServiceController.deleteService);
module.exports = router;