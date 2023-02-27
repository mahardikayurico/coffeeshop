const express = require("express");
const router = express();
const formUpload = require("../helper/upload");

//import controller=
const authController = require("../controller/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
module.exports = router;
