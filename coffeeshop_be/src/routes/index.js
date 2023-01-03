const express = require("express");
const router = express();
const productRoute = require("./product.routes");
// const userRoute = require("./user.routes");

router.get("/", (req, res) => {
  return res.send("backend fot coffee shop ");
});
router.use("/products", productRoute);
// router.use("/user", userRoute);

module.exports = router; //export, biar bisa diakses oleh file lain melalui require