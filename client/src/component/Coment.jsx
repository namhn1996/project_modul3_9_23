import axios from "axios";
import React, { useState } from "react";

function Coment({ product, fetchProduct }) {
  const [comment, setComment] = useState([]);
  const handleComment = (e) => {
    e.preventDefault();
    let dataComent = {
      coment: comment,
      product_id: product.product_id,
      user_id: JSON.parse(localStorage.getItem("user")).user_id,
    };
    axios
      .post("http://localhost:3010/api/v1/products", dataComent)
      .then((res) => {
        fetchProduct();
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="mb-3">
        <form className="form-floating" onSubmit={handleComment}>
          <input
            className="form-control"
            placeholder="Vui lòng nhập comment"
            id="floatingTextarea2"
            style={{ height: 100 }}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <label htmlFor="floatingTextarea2">Comments</label>
          <button type="submit" className="btn btn-primary mt-3 float-end">
            Gửi
          </button>
        </form>
      </div>

      <div className="row">
        <div className="mb-3 row">
          <h4 className="mt-5">Bình Luận</h4>
          <div className="col-12">
            {product.rate &&
              product.rate.map((e) => (
                <div className="form-floating mb-2">
                  <input
                    className="form-control"
                    style={{ height: 80 }}
                    disabled
                    defaultValue={`        ${e.coment}`}
                  />
                  <label style={{ color: "black" }}>
                    <b>{e.username}</b>
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coment;
