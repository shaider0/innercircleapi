const express = require("express");
const router = express.Router();
const { signup, signin, changePassword } = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/:id/change-password", changePassword)

module.exports = router;
