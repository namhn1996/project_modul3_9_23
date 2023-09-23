import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { vnd } from "../helpers";

function Lichsu() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  let loading = () => {
    axios
      .get(`http://localhost:3010/api/v1/order/${user.user_id}`)
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    loading();
  }, []);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  // const total =
  //   history && history.reduce((sum, item) => sum + item.price * item.count, 0);
  console.log("history", history);
  return (
    <div>
      <Header />
      <table class="table mt-5 table-hover table-striped table-bordered container-fluid">
        <thead>
          <tr className="table table-success">
            <th scope="col">STT</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Thành tiền</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Trạng thái</th>
            <th scope="col" colSpan="3">
              Thông tin khách hàng
            </th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr className="text-center">
              <td colSpan="6">Không có dữ liệu lịch sử</td>
            </tr>
          ) : (
            <>
              {history &&
                history.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        style={{ width: 100, height: 70 }}
                        src={item.img}
                        alt=""
                      />
                      <p>{item.product_name}</p>
                    </td>
                    <td>{vnd(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{vnd(item.price * item.quantity)}</td>
                    <td>{item.create_at}</td>
                    <td>{item.status}</td>
                    <td>
                      <p>Tên người nhận : {item.name}</p>
                      <p>
                        {" "}
                        Địa chỉ nhận :{item.address}
                        {item.ward}
                        {item.district}
                        {item.province}
                      </p>
                      <p> Số điện thoại : {item.phone}</p>
                    </td>
                    <td>{}</td>
                    <td>{}</td>
                  </tr>
                ))}
            </>
          )}

          <tr className="table table-success text-center">
            <td colSpan="6">
              <b>Tổng Tiền</b>
            </td>
            <td>
              <strong>ád</strong>
            </td>
            <td colSpan="3">
              <b>Trạng Thái</b>
            </td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Lichsu;
