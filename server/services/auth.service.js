const bcrypt = require("bcrypt");
const usersService = require("../services/users.service");
const jwt = require("jsonwebtoken");

module.exports.reg = async (username,email, password) => {
  let salt = bcrypt.genSaltSync(10);

  let hashPassword = bcrypt.hashSync(password, salt);

  return usersService.createUser(username,email, hashPassword);
};
module.exports.login = async (email, password) => {
  try {
    let findUser = await usersService.findOneByEmail(email);
    let [rows] = findUser;
    console.log(rows);
    if (rows.length === 0) {
      return {
        status: "400",
        message: "Email không chính xác",
      };
    } else {
      // Lấy ra bản ghi user đã tìm thấy
      let hashPassword = rows[0].password;

      // So sánh MK mã hoá và MK được gửi lên
      let compare = bcrypt.compareSync(password, hashPassword);

      if (!compare) {
        return {
          status: "401",
          message: "Password không chính xác",
        };
      } else {
        /////////////////////////////////
        let access_token = jwt.sign(
          { data: { id: rows[0].userId, email: rows[0].email } },
          process.env.TOKEN_SECET,
          { expiresIn: 1000 }
        );
        return {
          status: "200",
          message: "Đăng nhập thành công ",
          data: rows[0],
          access_token,
        };
      }
    }
  } catch (error) {
    return error;
  }
};
