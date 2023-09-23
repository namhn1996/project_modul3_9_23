import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { confirmAddCart, vnd } from "../helpers";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;

function Product() {
  const BASE_API = "http://localhost:3010/api/v1/";
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [rateLength, setRateLength] = useState(0);
  const [dataApple, setDataApple] = useState([]);
  const [dataOppo, setDataOppo] = useState([]);
  const [dataSamsung, setDataSamsung] = useState([]);
  const [dataNokia, setDataNokia] = useState([]);

  let dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_API}products`);
      const data = res.data.products;
      setData(() => [...data]);

      const resApple = await axios.get(`${BASE_API}products?category=apple`);
      const dataAp = resApple.data;
      setDataApple(() => [...dataAp]);
      const resOppo = await axios.get(`${BASE_API}products?category=oppo`);
      const dataOp = resOppo.data;
      setDataOppo(() => [...dataOp]);
      const resSamsung = await axios.get(
        `${BASE_API}products?category=samsung`
      );
      const dataSa = resSamsung.data;
      setDataSamsung(() => [...dataSa]);
      const resNokia = await axios.get(`${BASE_API}products?category=nokia`);
      const dataNo = resNokia.data;
      setDataNokia(() => [...dataNo]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCart = (id) => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập",
        text: "Bạn cần đăng nhập để mua hàng",
      });
    } else {
      const product = data.find((item) => item.product_id === id);
      let buyProduct = {
        ...product,
        cartCount: +1,
        user_id: user.user_id,
      };
      confirmAddCart().then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: "ADD_CART",
            payload: buyProduct,
          });
        }
      });
    }
  };
  return (
    <>
      {data &&
        data.map((product) => (
          <div className="products" key={product.product_id}>
            <Card
              style={{
                width: 300,
                height: 500,
              }}
              cover={
                <Link to={`/detail/${product.product_id}`}>
                  <img
                    style={{ width: 300, height: 300 }}
                    alt="example"
                    src={product.img}
                  />
                </Link>
              }
            >
              <Meta
                title={product.name}
                description={vnd(product.price * (1 - product.sale))}
                className="customModal"
              />
              <div className="star-home">
                <div>
                  {Array.from({ length: product.star }, (_, index) => (
                    <i key={index} className="fa fa-star"></i>
                  ))}
                </div>
                <div>
                  <span>{product.rate} đánh giá</span>
                </div>
              </div>
              <div className="addCart-home">
                <Link to={`/detail/${product.product_id}`} className="btn btn-danger addCart-btn">
                  Chi tiết sản phẩm
                </Link>
              </div>
              <label className="labelCart-home">
                <i className="fa fa-bolt"></i>
                {"   "}
                <span>Giảm giá {product.sale * 100} %</span>
              </label>
            </Card>
          </div>
        ))}
    </>
  );
}

export default Product;
