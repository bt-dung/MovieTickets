const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getAllUser, getManagers } = require("../controllers/User")


router.get("/users", getAllUser)
    .get("/user/:id", getUser)
    .get("/managers", getManagers)
    .patch("/user/:id/update", updateUser)
    .delete("/user/:id/delete", deleteUser);
module.exports = router;