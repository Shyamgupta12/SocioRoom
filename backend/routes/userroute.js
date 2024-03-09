const express = require('express');
const router = express.Router();

const {usersignup, userlogin, sendOTP} = require('../controllers/user');

router.post("/usersignup", usersignup);
router.post("/sendotp", sendOTP);
router.post("/userlogin", userlogin);

module.exports = router;