const express = require("express");
const server = express();

// Require các packages cần thiết
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const db = require("./utili/database");

dotenv.config();

// Require các routes cần thiết
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

// Sử dụng các packages
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

// Sử dụng các routes cần thiết
server.use("/api/v1/users", usersRoutes);
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/products", productsRoutes);
server.use("/api/v1/cart", cartRoutes);
server.use("/api/v1/order", orderRoutes);

// Lắng nghe server tại port
server.listen(3010, () => {
  console.log("Đang phát tại cổng http://localhost:3010");
});

// const data = JSON.parse(fs.readFileSync("./data/data.json").toString());
// console.log(data);
// data.forEach((product) => {
  // db.execute(
  //   `INSERT INTO products (name,price) VALUES ("${product.name}","${product.price}")`
  // );
  // db.execute(
  //   `INSERT INTO product_detail (screen,os,camara,camaraFront,cpu,ram,rom,sim,battery) VALUES ("${product.screen}","${product.os}","${product.camara}","${product.camaraFront}","${product.cpu}","${product.ram}","${product.rom}","${product.sim}","${product.battery}")`
  // );
  // db.execute(
  //   `INSERT INTO media (img) VALUES ("${product.img}")`
  // )
// });
