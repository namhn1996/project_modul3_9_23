const db = require("../utili/database");

module.exports.createUser = (username, email, password) => {
  return db.execute(
    "INSERT INTO users (username,email,password) VALUES (?,?,?)",
    [username, email, password]
  );
};
module.exports.usersAll = async () => {
  return db.execute("SELECT * FROM users ");
};
module.exports.userOne = async (userId) => {
  return db.execute("SELECT * FROM users WHERE userId = ?", [userId]);
};
module.exports.remove = async (userId) => {
  return db.execute("DELETE FROM users WHERE userId = ?", [userId]);
};
module.exports.findOneByEmail = async (email) => {
  return db.execute("SELECT * FROM users WHERE email = ?", [email]);
};
