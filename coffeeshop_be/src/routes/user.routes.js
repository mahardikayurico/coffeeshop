const express = require("express");
const router = express();

//import controller=
const userController = require("../controller/user.controller");

router.get("/", userController.get);
router.get("/:id", userController.getDetail);
router.post("/", userController.add);
router.patch("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
