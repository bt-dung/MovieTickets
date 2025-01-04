const express = require('express');
const router = express.Router();
const { checkinVerification, verified } = require('../controllers/authUser')

router.get("/verify/:userId/:uniqueString", checkinVerification)
    .get("/verified", verified);
module.exports = router;