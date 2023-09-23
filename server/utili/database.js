const mysql = require("mysql2");
const env = require("dotenv").config();
let pool = mysql.createPool({
  database: "webdienthoai",
  host: "localhost",
  user: "root",
  password: "",
});

module.exports = pool.promise();
