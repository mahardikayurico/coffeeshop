const express = require("express");
const router = express();
const verifyToken = require("../helper/verifyToken");
const formUpload = require("../helper/upload");

//import controller=
const productController = require("../controller/product.controller");

router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", verifyToken, formUpload.array("img"), productController.add);
router.patch(
  "/:id",
  verifyToken,
  formUpload.array("img"),
  productController.update
);
router.delete("/:id", verifyToken, productController.remove);

module.exports = router;
