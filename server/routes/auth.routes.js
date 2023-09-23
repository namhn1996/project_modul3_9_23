const express = require("express");
const router = express.Router();

const { reg, login } = require("../controller/auth.controller");

router.post("/reg", reg);
router.post("/login", login);

module.exports = router;
