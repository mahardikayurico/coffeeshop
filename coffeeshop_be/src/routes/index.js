const express = require("express");
const router = express();
const productRoute = require("./product.routes");
const userRoute = require("./user.routes");
const authRoute = require("../routes/auth.routes");
const orderRoute = require("../routes/order.routes");

router.get("/", (req, res) => {
  return res.send("backend for coffee shop ");
});
router.use("/products", productRoute);
router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/order", orderRoute);

module.exports = router; //export, biar bisa diakses oleh file lain melalui require
