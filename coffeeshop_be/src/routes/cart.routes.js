const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
//import controller=
const cartController = require("../controller/cart.controller");

router.get("/history", cartController.get);
router.get("/history/:id", cartController.getDetail);
router.post("/order", cartController.add);
router.delete("/history/:id", cartController.remove);

module.exports = router;
