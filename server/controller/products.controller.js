const db = require("../utili/database");
const productsService = require("../services/products.service");
const fs = require("fs");

module.exports.postProduct = async (req, res) => {
  try {
    let { product_id, coment, user_id } = req.body;
    await productsService.postComent(product_id, coment, user_id);
    res.json({
      status: 200,
      message: "Thêm sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      error: error,
      status: 404,
      message: error.message,
    });
  }
};
// const data = JSON.parse(fs.readFileSync("./data/data.json").toString());
// console.log(data);
// data.forEach((product) => {
//   db.execute(
//     `INSERT INTO products (name,price) VALUES ("${product.name}","${product.price}")`
//   );
//   db.execute(
//     `INSERT INTO product_detail (screen,os,camara,camaraFront,cpu,ram,rom,sim,battery) VALUES ("${product.screen}","${product.os}","${product.camara}","${product.camaraFront}","${product.cpu}","${product.ram}","${product.rom}","${product.sim}","${product.battery}")`
//   );
// });

module.exports.getAllProducts = async (req, res) => {
  try {
    const data = await productsService.getAllProducts();
    const getRate = await db.execute(`SELECT * FROM product_rate`);
    const [rows2] = getRate;
    const [rows] = data;
    let countRate = rows.map((product) => ({
      ...product,
      rate:
        rows2.filter((item) => item.product_id === product.product_id).length ||
        0,
    }));
    res.json({
      status: 200,
      products: countRate,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports.getOneProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productsService.getOneProducts(id);
    const data2 = await db.execute(
      `SELECT r.*,u.username FROM product_rate r 
      JOIN users u ON r.user_id = u.user_id  WHERE r.product_id = ${id}`
    );
    const [rows] = data;
    const [rows2] = data2;
    const rows3 = rows.map((product) => ({
      ...product,
      rate: [...rows2],
    }));
    if (rows.length === 0) {
      res.json({
        status: 404,
        message: "Không tìm thấy sản phẩm",
      });
    } else {
      res.json({
        status: 200,
        product: rows3[0],
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productsService.deleteProduct(id);
    res.json({
      status: 200,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
