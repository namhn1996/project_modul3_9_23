const express = require("express");
const router = express.Router();
const db = require("../utili/database");

// require các controllers cần thiết
const {
  createUser,
  usersAll,
  userOne,
  remove,
} = require("../controller/users.controller");


router.post("/", createUser);
router.get("/", usersAll);
router.get("/:id", userOne);
router.delete("/:id", remove);

module.exports = router;
