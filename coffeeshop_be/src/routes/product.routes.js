const express = require("express");
const router = express();

//import controller=
const productController = require("../controller/product.controller");

router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", productController.add);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

module.exports = router;
