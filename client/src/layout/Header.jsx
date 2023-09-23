import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Header({ activeCart }) {
  const isLogin = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"), []);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3010/api/v1/cart/${user?.user_id}`
      );
      setCart(response.data.cart);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [activeCart]);

  // Xử lý sự thay đổi trong giỏ hàng

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const handleClickCart = () => {
    if (!isLogin) {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập",
        text: "Bạn cần đăng nhập để mua hàng",
      });
    }
  };

  return (
    <div className="a-navbar ">
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid n-navbar">
          <div className="navbar-brand ">
            <Link className="navbar-brand hover-overlay" to="/">
              <i className="fa-solid fa-house"></i> Trang chủ
            </Link>
          </div>
          <div className="navbar-brand ">
            <Link className="navbar-brand hover-overlay" to="/tintuc">
              <i className="fa-solid fa-newspaper"></i> Tin tức
            </Link>
          </div>
          <div className="navbar-brand ">
            <Link className="navbar-brand hover-overlay" to="/tuyendung">
              <i className="fa-solid fa-users"></i> Tuyển dụng
            </Link>
          </div>
          <div className="navbar-brand">
            <Link className="navbar-brand hover-overlay" to="/gioithieu">
              <i className="fa-solid fa-book"></i> Giới thiệu
            </Link>
          </div>
          <div className="navbar-brand">
            <Link className="navbar-brand hover-overlay" to="/baohanh">
              <i className="fa fa-wrench"></i> Bảo hành
            </Link>
          </div>
          <div className="navbar-brand">
            <Link className="navbar-brand hover-overlay" to="/lienhe">
              <i className="fa-solid fa-phone"></i> Liên hệ
            </Link>
          </div>
        </div>
      </nav>
      <div
        className="navbar-collapse d-flex justify-content-around container"
        id="navbarSupportedContent"
      >
        <div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="logo d-flex justify-content-center">
          <img className="logo" src="/img/logo.jpg" alt="" />
        </div>

        <div className=" d-flex justify-content-end">
          <div className="navbar-brand ">
            {!isLogin ? (
              <Link className="btn" to="/login">
                <i className="fa-solid fa-user"></i> Tài khoản
              </Link>
            ) : (
              <div className="dropdown ">
                {" "}
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i> Chào {user.username}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" type="button">
                      <NavLink to={`/history/${user.user_id}`}>
                        {" "}
                        <i className="fa-solid fa-book-medical"></i> Lịch sử đơn
                        hàng
                      </NavLink>
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-right-from-bracket" /> Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="navbar-brand ">
            {!isLogin ? (
              <Link
                className="btn position-relative "
                onClick={handleClickCart}
              >
                <i class="fa-solid fa-cart-shopping "></i> Giỏ hàng{" "}
                {!isLogin ? (
                  ""
                ) : (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {" "}
                    {cart.length}{" "}
                  </span>
                )}
              </Link>
            ) : (
              <Link className="btn position-relative " to="/cart">
                <i className="fa-solid fa-cart-shopping "></i> Giỏ hàng{" "}
                {!isLogin ? (
                  ""
                ) : (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {" "}
                    {cart.length}{" "}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
