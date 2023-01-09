const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");

//import controller=
const productController = require("../controller/product.controller");

router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", verifyToken, productController.add);
router.patch("/:id", verifyToken, productController.update);
router.delete("/:id", verifyToken, productController.remove);

module.exports = router;
