const db = require("../utili/database");

module.exports.postProduct = async () => {
  return db.execute(
    "INSERT INTO products (name,company,img,price,star,rateCount,promo_name,promo_value,screen,os,camara,camaraFront,cpu,ram,rom,microUSB,battery,masp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    []
  );
};

module.exports.postComent = async (product_id, coment, user_id) => {
  return db.execute(
    "INSERT INTO product_rate (product_id,coment,user_id) VALUES (?,?,?)",
    [product_id, coment, user_id]
  );
};

module.exports.getAllProducts = async () => {
  return db.execute(`SELECT p.product_id, p.name, p.price, p.sale, p.count, c.name as category,m.img, pd.screen,pd.star, pd.os, pd.camara, pd.camaraFront, pd.cpu, pd.ram, pd.rom, pd.sim, pd.battery 
  FROM products p 
  JOIN product_detail pd ON p.product_id = pd.product_id 
  JOIN category c ON p.category_id = c.category_id 
  JOIN media m ON p.product_id = m.product_id`);
};

module.exports.getOneProducts = async (id) => {
  return db.execute(
    `SELECT p.product_id, p.name, p.price, p.sale, p.count, c.name as category,m.img, pd.screen, pd.os, pd.camara, pd.camaraFront, pd.cpu, pd.ram, pd.rom, pd.sim, pd.battery 
  FROM products p 
  JOIN product_detail pd ON p.product_id = pd.product_id 
  JOIN category c ON p.category_id = c.category_id 
  JOIN media m ON p.product_id = m.product_id 
  WHERE p.product_id = ?`,
    [id]
  );
};

module.exports.deleteProduct = async (id) => {
  return db.execute("DELETE FROM products WHERE id = ?", [id]);
};
