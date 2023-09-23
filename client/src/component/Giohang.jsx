import React, { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import axios from "axios";
import { showMessage, thanhtoan } from "../helpers";
import { Result } from "antd";
import Swal from "sweetalert2";
import { vnd } from "../helpers";
import { Link } from "react-router-dom";
import moment from "moment";
function Giohang() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [provinces, setProvinces] = useState([]); // Tỉnh/Thành Phố
  let [activeProvince, setActiveProvince] = useState("");
  let [districts, setDistricts] = useState([]); // Quận/Huyện
  let [activeDistrict, setActiveDistrict] = useState("");
  let [wards, setWards] = useState([]); // Phường/Xã
  let [activeWard, setActiveWard] = useState("");

  let VIETNAM_BASE_API = "https://provinces.open-api.vn/api/?depth=3";
  const fetchProvinces = async () => {
    try {
      let res = await fetch(VIETNAM_BASE_API);
      let data = await res.json();
      setProvinces(() => [...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    let clickProvince = provinces.find((e) => e.name == activeProvince);
    if (clickProvince) {
      setDistricts(() => [...clickProvince.districts]);
      setActiveWard("");
    }
  }, [activeProvince]);

  useEffect(() => {
    let clickDistrict = districts.find((e) => e.name == activeDistrict);
    if (clickDistrict) {
      setWards(() => [...clickDistrict.wards]);
    }
  }, [activeDistrict]);

  const handleActiveProvince = (e) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveProvince(e.target.value);
    }
  };

  const handleActiveDistrict = (e) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveDistrict(e.target.value);
    }
  };

  const handleActiveWard = (e) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveWard(e.target.value);
    }
  };

  function resetAllProvinces() {
    setActiveProvince("");
    setActiveDistrict("");
    setDistricts([]);
    setActiveWard("");
    setWards([]);
  }

  const [activeCart, setActiveCart] = useState(false);
  const fetchCart = async () =>
    await axios
      .get(`http://localhost:3010/api/v1/cart/${user.user_id}`)
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => {
        console.log(err.message);
      });
  useEffect(() => {
    fetchCart();
  }, [activeCart]);
  const handleKaike = (e) => {
    e.preventDefault();
    try {
      if (cart && cart.length > 0) {
        const data = cart.map((item) => ({
          user_id: user.user_id,
          status: "Đang xử lý",
          create_at: moment().format("HH:mm:ss DD/MM/YYYY"),
          name,
          email,
          phone,
          province: activeProvince,
          district: activeDistrict,
          ward: activeWard,
          address,
          product_id: item.product_id,
          product_name: item.name,
          product_quantity: item.quantity,
          product_price: item.price,
          product_sale: item.sale,
        }));
        thanhtoan()
          .then((result) => {
            if (result.isConfirmed) {
              try {
                axios
                  .post(`http://localhost:3010/api/v1/order`, data)
                  .then((res) => {
                    ``;
                    setActiveCart(!activeCart);
                  });
              } catch (error) {
                console.log(error);
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              console.log("hủy");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleGiam = (quantity, id) => {
    axios
      .put(`http://localhost:3010/api/v1/cart/minus/${user.user_id}`, {
        quantity,
        user_id: user.user_id,
        product_id: id,
      })
      .then((res) => {
        fetchCart();
      })
      .catch((err) => console.log(err));
  };
  const handleTang = (quantity, id) => {
    axios
      .put(`http://localhost:3010/api/v1/cart/des/${user.user_id}`, {
        quantity,
        user_id: user.user_id,
        product_id: id,
      })
      .then((res) => {
        fetchCart();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn đang muốn xóa sản phẩm này?",
      text: "Bạn có muốn xóa sản phẩm không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3010/api/v1/cart/${id}/${user.user_id}`)
          .then((res) => {
            showMessage("success", "Đã xóa sản phẩm khỏi giỏ hàng");
            fetchCart();
          })
          .catch((err) => console.log(err));
      } else {
        console.log("Hủy bỏ xóa");
      }
    });
  };
  return (
    <div>
      <Header activeCart={activeCart} />
      <table class="table container mt-5">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Thành tiền</th>
            <th scope="col">Acction</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link to={`/detail/${item.product_id}`}>
                    <img
                      style={{ width: 100, height: 70 }}
                      src={item.img}
                      alt=""
                    />
                    {item.name}
                  </Link>
                </td>
                <td>
                  <b>{vnd(item.price * (1 - item.sale))}</b>
                </td>
                <td>
                  <div className="quantity-area d-flex mt-4">
                    <input
                      type="button"
                      value="-"
                      onClick={() => {
                        handleGiam(item.quantity, item.product_id);
                      }}
                    />
                    <input type="text" disabled value={item.quantity} />
                    <input
                      type="button"
                      value="+"
                      onClick={() => {
                        handleTang(item.quantity, item.product_id);
                      }}
                    />
                  </div>
                </td>
                <td>
                  {(
                    item.price *
                    (1 - item.sale) *
                    item.quantity
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.product_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h3>Không có sản phẩm nào trong giỏ hàng</h3>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <b>Tổng tiền</b>
            </td>
            <td>
              {cart &&
                cart
                  .reduce((a, b) => a + b.price * (1 - b.sale) * b.quantity, 0)
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
            </td>
            <td>
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Thanh toán
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      <Footer />
      <>
        {/* Modal */}
        <div
          className="modal fade left-side"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Thông tin khách hàng
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {" "}
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Họ và tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="address-container mb-3">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={handleActiveProvince}
                      value={activeProvince}
                    >
                      <option selected value="">
                        Tỉnh/Thành
                      </option>
                      {provinces.length > 0 &&
                        provinces.map((e, i) => (
                          <option value={e.name}>{e.name}</option>
                        ))}
                    </select>

                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={handleActiveDistrict}
                      value={activeDistrict}
                    >
                      <option selected value="">
                        Quận/Huyện
                      </option>
                      {districts.length > 0 &&
                        districts.map((e, i) => (
                          <option value={e.name}>{e.name}</option>
                        ))}
                    </select>

                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={handleActiveWard}
                      value={activeWard}
                    >
                      <option selected value="">
                        Phường/Xã
                      </option>
                      {wards.length > 0 &&
                        wards.map((e, i) => (
                          <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                  </div>{" "}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vui lòng nhập chi tiết số nhà, tên đường, VD: Số 69, Đường ..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-footer mb-3 modal-footer">
                    <Link className="back btn btn-primary" to="/cart">
                      Giỏ hàng
                    </Link>
                    <Link
                      className="step btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={handleKaike}
                    >
                      Xác nhận thanh toán
                    </Link>
                    <button
                      className="canel btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Canel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Giohang;
