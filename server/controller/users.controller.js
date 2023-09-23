const db = require("../utili/database");
const usersService = require("../services/users.service");

module.exports.createUser = async (req, res) => {
  let { username, email, address, password } = req.body;
  try {
    const data = await usersService.createUser(
      username,
      email,
      address,
      password
    );
    let [rows] = data;
    res.json({
      status: 200,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: 404,
    });
  }
};

module.exports.usersAll = async (req, res) => {
  try {
    const data = await usersService.usersAll();

    const [rows] = data;
    res.json({
      status: 200,
      users: rows,
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
module.exports.userOne = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await usersService.userOne(id);
    const [rows] = data;
    console.log(rows);
    if (rows.length === 0) {
      res.json({
        status: 404,
        message: "User not found",
      });
    } else {
      res.json({
        status: 200,
        user: rows,
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
module.exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await usersService.remove(+id);
    res.json({
      status: 200,
      message: "Xóa thành công",
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
