const express = require("express");
const router = express.Router();
const db = require("../utili/database");

const { postOrder } = require("../controller/order.controller");

router.post("/", postOrder);

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data =
      await db.execute(`SELECT p.product_id,p.product_name,m.img,p.product_quantity quantity,p.product_price price,p.product_sale sale,
    o.user_id,o.status,o.create_at,o.name,o.phone,o.email,o.province,o.district,o.ward,o.address 
    FROM order_product p 
    JOIN orderr o
    ON p.order_id = o.order_id
    JOIN media m
    ON p.product_id = m.product_id
    WHERE user_id = ${id}`);
    const [rows] = data;
    res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});
module.exports = router;
