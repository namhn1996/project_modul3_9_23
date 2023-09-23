const db = require("../utili/database");
const orderService = require("../services/order.service");

module.exports.postOrder = async (req, res) => {
    console.log(req.body);
  try {
    await orderService.postOrder(req);
    const [orderIdRows] = await orderService.order_id();
    const order_id = orderIdRows[0].order_id;
    console.log(order_id);

    for (let i = 0; i < req.body.length; i++) {
      await db.execute(
        `INSERT INTO order_product (order_id, product_id, product_name, product_quantity, product_price, product_sale)
            VALUES (${order_id}, ${req.body[i].product_id}, '${req.body[i].product_name}', ${req.body[i].product_quantity}, ${req.body[i].product_price}, ${req.body[i].product_sale});`
      );
    }
    await orderService.deleteCart(req);
    res.json({
      status: 200,
      message: "Thêm vào order thành công",
      data: req.body,
    });
  } catch (error) {
    res.json({
      error: error,
      status: 404,
      message: error.message,
    });
  }
};
