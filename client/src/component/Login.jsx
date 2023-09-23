import React, { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { showMessage } from "../helpers";
import axios from "axios";

function Login() {
  const [type, setType] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let baseURL = "http://localhost:3010/api/v1";

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const login = await axios.post(`${baseURL}/auth/login`, user);
      const data = login.data;
      if (data.status === "400") {
        showMessage("error", data.message);
      } else if (data.status === "200") {
        showMessage("success", data.message);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.access_token);
        // localStorage.setItem("cart", JSON.stringify([]));

        navigate("/");
      } else {
        showMessage("error", data.message);
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
        onSubmit={handleLogin}
      >
        {/* Email input */}
        <h1>Đăng Nhập</h1>
        <div className="form-outline mb-4 bg-light border ">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="form2Example1">
            Địa chỉ Email
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
        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="form2Example34"
                defaultChecked=""
              />

              <label className="form-check-label" htmlFor="form2Example34">
                {" "}
                Ghi nhớ{" "}
              </label>
            </div>
          </div>
          <div className="col">
            {/* Simple link */}
            <a href="#!">Quên mật khẩu?</a>
          </div>
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Đăng nhập
        </button>
        {/* Register buttons */}
        <div className="text-center">
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
          <p>hoặc đăng nhập với:</p>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-facebook-f" />
          </button>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-google" />
          </button>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-twitter" />
          </button>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-github" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
