const db = require("../utili/database");
const mysql = require("mysql2");

module.exports.fiilterByCategory = async (req, res, next) => {
  const { category } = req.query;
  console.log(category);
  try {
    if (!category) {
      next();
    } else {
      const data = await db.execute(
        `SELECT p.product_id, p.name, p.price, p.sale, p.count, c.name as category,m.img, pd.screen, pd.os, pd.camara, pd.camaraFront, pd.cpu, pd.ram, pd.rom, pd.sim, pd.battery 
        FROM products p 
        JOIN product_detail pd ON p.product_id = pd.product_id 
        JOIN category c ON p.category_id = c.category_id 
        JOIN media m ON p.product_id = m.product_id
         WHERE c.name = "${category}"`
      );
      const [rows] = data;
      res.json(rows);
    }
  } catch (error) {
    console.log(error);
  }
};
