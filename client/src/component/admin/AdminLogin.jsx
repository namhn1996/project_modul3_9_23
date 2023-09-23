import React, { useState } from "react";
import "../../css/admin/AdminLogin.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      Swal.fire({
        icon: "success",
        title: "Đã đăng nhập",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/admin");
    } else {
      Swal.fire({
        icon: "error",
        title: "Đã sai tài khoản hoặc mật khẩu",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic" data-tilt="">
            <img src="../../../public/img/admin/team.jpg" alt="IMG" />
          </div>
          {/*=====TIÊU ĐỀ======*/}

          <form className="login100-form text-center" onSubmit={handleLogin}>
            <h3 className="login100-form-title mb-5">
              <b>HỆ THỐNG BÁN HÀNG</b>
            </h3>
            {/*=====FORM INPUT TÀI KHOẢN VÀ PASSWORD======*/}
            <div className="wrap-input100 mb-3">
              <input
                className="input100"
                type="text"
                placeholder="Tài khoản quản trị"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="bx bx-user" />
              </span>
            </div>
            <div className="wrap-input100">
              <input
                autoComplete="off"
                className="input100"
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                toggle="#password-field"
                className="bx fa-fw bx-hide field-icon click-eye"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="bx bx-key" />
              </span>
            </div>
            {/*=====ĐĂNG NHẬP======*/}
            <div className="container-login100-form-btn mt-4 mb-4">
              <button type="submit" className="btn btn-primary">
                Đăng nhập
              </button>
            </div>
            {/*=====LINK TÌM MẬT KHẨU======*/}
            <div className="text-right">
              <a className="txt2" href="/">
                Bạn quên mật khẩu?
              </a>
            </div>
          </form>
          {/*=====FOOTER======*/}
          <div className="text-center txt2 mt-5">
            Quản lý hệ thống bán hàng{" "}
            <i className="far fa-copyright" aria-hidden="true" />
            <a className="txt2" href="https://www.facebook.com/namhn1996/">
              {" "}
              Code by Phương Nam{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
