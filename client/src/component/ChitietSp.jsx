import React, { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import "../css/chitietsanpham.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { confirmAddCart, daCoTrongCart, showMessage } from "../helpers";
import Swal from "sweetalert2";
import { vnd } from "../helpers";
import Coment from "./Coment";

function ChitietSp() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeCart, setActiveCart] = useState(false);

  const user_id = user.user_id;
  const { id } = useParams();
  const fetchProduct = async () =>
    await axios
      .get(`http://localhost:3010/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  const fetchCart = async () =>
    await axios
      .get(`http://localhost:3010/api/v1/cart/${user_id}`)
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => {
        console.log(err.message);
      });
  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [id]);
  const handleCart = async (id) => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập",
        text: "Bạn cần đăng nhập để mua hàng",
      });
    } else {
      const productIndex = cart.findIndex((item) => item.product_id === id);
      if (productIndex !== -1) {
        // Sản phẩm có trong giỏ hàng
        Swal.fire({
          title: "Sản phẩm đã có trong giỏ hàng",
          text: "Bạn có muốn mua thêm số lượng?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy bỏ",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(quantity);
            // Sản phẩm có trong giỏ hàng, thêm số lượng
            axios
              .put(`http://localhost:3010/api/v1/cart/${user_id}`, {
                quantity,
                user_id,
                product_id: id,
              })
              .then((res) => {
                console.log(res.data);
                setQuantity(1);
                setActiveCart(!activeCart);
                showMessage("success", "Đã thêm vào giỏ hàng");
              })
              .catch((err) => console.log(err));
          } else {
            console.log("Hủy bỏ mua thêm số lượng");
          }
        });
      } else {
        // Sản phẩm chưa có trong giỏ hàng, thêm mới
        const newProduct = {
          product_id: id,
          quantity: quantity,
          user_id: user.user_id,
        };
        confirmAddCart()
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .post("http://localhost:3010/api/v1/cart", newProduct)
                .then((res) => {
                  setActiveCart(!activeCart);
                  setQuantity(1);
                })
                .catch((err) => {
                  console.log(err.message);
                });
            } else {
              console.log("Hủy bỏ thêm vào giỏ hàng");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <Header activeCart={activeCart}/>
      <div className="chitietSanpham container">
        <h1>{product.name} </h1>
        <div className="rating">
          {" "}
          {Array.from({ length: product.star }, (_, index) => (
            <i key={index} className="fa fa-star"></i>
          ))}
        </div>

        <div className="rowdetail ">
          <div className="picture">
            <img src={product.img} />
          </div>
          <div className="price_sale">
            <div className="sale-price ">
              <p> Giá gốc : {product.price && vnd(product.price)}</p>
              <p style={{ color: "red" }}> Sale : {product.sale * 100} %</p>
            </div>
            <div className="ship area_promo text-center">
              Giá ưu đãi chỉ còn :
              {product.price &&
                product.sale &&
                vnd(product.price * (1 - product.sale))}
            </div>
            <div className="area_promo">
              <strong>khuyến mãi</strong>
              <div className="promo">
                <img src="/img/chitietsanpham/icon-tick.png" />
                <div id="detailPromo">
                  {" "}
                  Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi
                  trả lỗi trong vòng 2 tháng.
                </div>
              </div>
            </div>
            <div className="policy">
              <div>
                <img src="/img/chitietsanpham/box.png" />
                <p>
                  Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp
                  lưng{" "}
                </p>
              </div>
              <div>
                <img src="/img/chitietsanpham/icon-baohanh.png" />
                <p>Bảo hành chính hãng 12 tháng.</p>
              </div>
              <div className="last">
                <img src="/img/chitietsanpham/1-1.jpg" />
                <p>
                  1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1
                  ngày.
                </p>
              </div>
            </div>
            <div className="quantity-area d-flex mt-4">
              <h3>Số lượng : {product.count}</h3>

              <input
                type="button"
                value="-"
                onClick={() => {
                  if (quantity > 0) setQuantity(quantity - 1);
                }}
              />
              <input type="text" value={quantity} />
              <input
                type="button"
                value="+"
                onClick={() => {
                  if (quantity < product.count) setQuantity(quantity + 1);
                }}
              />
            </div>
            <div className="area_order">
              <a
                href="#"
                className="buy_now"
                onClick={() => {
                  handleCart(product.product_id);
                }}
              >
                <b>
                  <i className="fa fa-cart-plus" /> Thêm vào giỏ hàng
                </b>
                <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
              </a>
            </div>
          </div>
          <div className="info_product">
            <h2>Thông số kỹ thuật</h2>
            <ul className="info">
              <li>Màn hình: {product.screen}</li>
              <li>Hệ điều hành: {product.os}</li>
              <li>Camara sau: {product.camara}</li>
              <li>Camara trước: {product.camara}</li>
              <li>CPU: {product.cpu}</li>
              <li>RAM: {product.ram}</li>
              <li>Bộ nhớ trong: {product.rom}</li>
              <li>Thẻ nhớ: {product.microUSB}</li>
              <li>Dung lượng pin: {product.battery}</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <h1 className="text-center mb-5 mt-5">Bình Luận Của Khách Hàng </h1>
        <Coment product={product} fetchProduct={fetchProduct} />
        <Footer />
      </div>
    </>
  );
}

export default ChitietSp;
