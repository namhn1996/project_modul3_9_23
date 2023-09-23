const express = require("express");
const router = express.Router();
const db = require("../utili/database");

const {
  postProduct,
  getAllProducts,
  getOneProducts,
  deleteProduct,
} = require("../controller/products.controller");

const { fiilterByCategory } = require("../middlleware.js/product.middleware");

router.post("/", postProduct);
router.get("/", fiilterByCategory, getAllProducts);
router.get("/:id", getOneProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
