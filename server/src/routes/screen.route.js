const express = require('express');
const router = express.Router();
const ScreenController = require("../controllers/Screens")


router.get("/screens/:theaterId", ScreenController.getScreensByTheaterId)
    .patch("/screen/:id/update", ScreenController.updateScreen)
    .post("/create-screen", ScreenController.createScreen)
    .delete("/screen/:id/delete", ScreenController.deleteScreen);
module.exports = router;