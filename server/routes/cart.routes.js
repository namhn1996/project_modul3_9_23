const express = require("express");
const router = express.Router();
const db = require("../utili/database");

router.post("/", async (req, res) => {
  let { user_id, product_id, quantity } = req.body;
  try {
    console.log(req.body);
    await db.execute(
      "INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?)",
      [user_id, product_id, quantity]
    );
    res.json({
      status: 200,
      message: "Thêm sản phẩm vào giỏ hàng thành công",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await db.execute("SELECT * FROM cart");
    const [rows] = cart;
    res.json({
      status: 200,
      cart: rows,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

router.delete("/:id/:user_id", async (req, res) => {
  try {
    const { id, user_id } = req.params;
    await db.execute("DELETE FROM cart WHERE product_id = ? and user_id = ?", [
      id,
      user_id,
    ]);
    res.json({
      status: 200,
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await db.execute(
      `SELECT p.*,m.img, c.quantity,u.username,u.user_id FROM cart c 
      JOIN products p ON c.product_id = p.product_id
      JOIN users u ON c.user_id = u.user_id
      JOIN media m ON p.product_id = m.product_id
      where c.user_id = ?`,
      [id]
    );
    const [rows] = cart;
    res.json({
      status: 200,
      cart: rows,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, product_id } = req.body;
    console.log(quantity);
    const cart = await db.execute(
      "SELECT quantity,p.product_id FROM cart c JOIN products p ON c.product_id = p.product_id WHERE c.user_id =? and p.product_id = ?",
      [id, product_id]
    );
    let [rows] = cart;
    if (rows.length > 0) {
      const newQuantity = quantity + rows[0].quantity;
      await db.execute(
        "UPDATE cart SET quantity = ?  WHERE user_id = ? and product_id = ?;",
        [Number(newQuantity), id, product_id]
      );
      res.json({
        status: 200,
        message: "Cập nhật giỏ hàng thành công",
      });
    } else {
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});
router.put("/des/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, product_id } = req.body;
    const cart = await db.execute(
      "SELECT quantity,p.product_id FROM cart c JOIN products p ON c.product_id = p.product_id WHERE c.user_id =? and p.product_id = ?",
      [id, product_id]
    );
    let [rows] = cart;
    if (rows.length > 0) {
      const newQuantity = quantity + 1;
      await db.execute(
        "UPDATE cart SET quantity = ?  WHERE user_id = ? and product_id = ?;",
        [Number(newQuantity), id, product_id]
      );
      res.json({
        status: 200,
        message: "Cập nhật giỏ hàng thành công",
      });
    } else {
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});
router.put("/minus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, product_id } = req.body;
    console.log(quantity);
    const cart = await db.execute(
      "SELECT quantity,p.product_id FROM cart c JOIN products p ON c.product_id = p.product_id WHERE c.user_id =? and p.product_id = ?",
      [id, product_id]
    );
    let [rows] = cart;
    if (rows.length > 0) {
      const newQuantity = quantity - 1;
      await db.execute(
        "UPDATE cart SET quantity = ?  WHERE user_id = ? and product_id = ?;",
        [Number(newQuantity), id, product_id]
      );
      res.json({
        status: 200,
        message: "Cập nhật giỏ hàng thành công",
      });
    } else {
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});
module.exports = router;
