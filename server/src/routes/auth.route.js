const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authUser');

router.post("/login", loginUser)
    .post("/register", registerUser)
    .post('/logout', logoutUser);
module.exports = router;