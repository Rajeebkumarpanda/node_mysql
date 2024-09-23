const express = require("express");
const { getUser } = require("../controller/userController");
const router = express.Router();

//get all user
router.get("/",getUser);

module.exports = router;