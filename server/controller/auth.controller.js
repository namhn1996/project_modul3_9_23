const authService = require("../services/auth.service");

module.exports.reg = async (req, res) => {
  let {username, email, password } = req.body;
  try {
    await authService.reg(username,email, password);
    res.json({
      status: 200,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
module.exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
