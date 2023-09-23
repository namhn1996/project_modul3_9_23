import React, { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showMessage } from "../helpers";

function Reg() {
  const [type, setType] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const baseURL = "http://localhost:3010/api/v1";

  const handleRegester = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    try {
      const res = await axios.post(`${baseURL}/auth/reg`, user);
      const data = res.data;

      if (data.error) {
        if (data.error.errno === 1062) {
          showMessage("error", "Email already in use");
        } else {
          showMessage("error", data.error.message);
        }
      } else {
        showMessage("success", data.message);
        navigate("/login");
      }
    } catch (error) {
      showMessage("error", error.message);
    }
  };
  return (
    <div>
      <video
        className="video-bg"
        src="/img/bgvideo/login-bg-video.mp4"
        autoPlay
        loop
        muted
      ></video>
      <form
        className="container text-center p-5 mb-5 border shadow form-signin"
        onSubmit={handleRegester}
      >
        {/* Email input */}
        <h1>Đăng Ký</h1>
        <div className="form-outline mb-4 bg-light border ">
          <input
            type="text"
            id="form2Example2"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="form-label" htmlFor="form2Example2">
            Họ và Tên
          </label>
        </div>
        <div className="form-outline mb-4 bg-light border ">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email
          </label>
        </div>
        {/* Password input */}
        <div className="form-outline mb-4 bg-light border ">
          <input
            type={type ? "text" : "password"}
            id="form2Example2"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            class="fa-solid fa-eye-low-vision"
            onClick={() => setType(!type)}
          ></i>
          <label className="form-label" htmlFor="form2Example2">
            Mật khẩu
          </label>
        </div>
        <div className="form-outline mb-4 bg-light border ">
          <input
            type={type ? "text" : "password"}
            id="form2Example2"
            className="form-control"
          />
          <i
            class="fa-solid fa-eye-low-vision"
            onClick={() => setType(!type)}
          ></i>
          <label className="form-label" htmlFor="form2Example2">
            Xác nhận mật khẩu
          </label>
        </div>
        {/* 2 column grid layout for inline styling */}

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Đăng ký
        </button>
        {/* Register buttons */}
        <div className="text-center">
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Reg;
