const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getAllUser } = require("../controllers/User")


router.get("/users", getAllUser)
    .get("/user/:id", getUser)
    .patch("/user/:id/update", updateUser)
    .delete("/user/delete", deleteUser);