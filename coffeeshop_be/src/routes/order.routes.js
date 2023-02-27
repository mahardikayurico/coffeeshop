const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
const formUpload = require("../helper/upload");
//import controller=
const orderController = require("../controller/order.controller.js");

router.post("/", formUpload.single("image"), orderController.add);
router.get("/:user_id", orderController.getByUserId);

module.exports = router;
