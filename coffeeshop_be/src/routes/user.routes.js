const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const userController = require("../controller/user.controller");

router.get("/", verifyToken, userController.get);
router.get("/:id", userController.getDetail);
router.patch("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
