const db = require("../utili/database");

module.exports.postOrder = async (req, res) => {
  return db.execute(`
    INSERT INTO orderr (user_id, status,create_at, name, email, phone, province, district, ward, address)
    VALUES (${req.body[0].user_id}, '${req.body[0].status}','${req.body[0].create_at}', '${req.body[0].name}', '${req.body[0].email}', '${req.body[0].phone}', '${req.body[0].province}', '${req.body[0].district}', '${req.body[0].ward}', '${req.body[0].address}')`);
};

module.exports.order_id = async (req, res) => {
  return db.execute(`SELECT LAST_INSERT_ID() AS order_id`);
};

module.exports.deleteCart = async (req, res) => {
  return db.execute(`DELETE FROM cart WHERE user_id = ${req.body[0].user_id}`);
};
