const express = require('express');
const router = express.Router();

const {usersignup, userlogin} = require('../controllers/user');

router.post("/usersignup", usersignup);
router.get("/userlogin", userlogin);

module.exports = router;