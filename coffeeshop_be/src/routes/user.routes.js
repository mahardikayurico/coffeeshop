const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const userController = require("../controller/user.controller");
const formUpload = require("../helper/upload");

router.get("/", verifyToken, userController.get);
router.get("/:id", userController.getDetail);
router.patch("/:id", formUpload.single("image"), userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
