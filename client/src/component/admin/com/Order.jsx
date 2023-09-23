import React, { useState } from "react";

function Order() {
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = () => {
    setIsLocked(!isLocked);
  };
  return (
    <div className="col py-3">
      <h4 className="h2 text-success border-bottom border-success">
        Quản Lý Đơn Hàng
      </h4>
      <div className="container-fluid ">
        <table className="table-hover ">
          <thead className="bg-light text-center">
            <tr className="table-active">
              <th scope="col">STT</th>
              <th scope="col">Đơn Hàng</th>
              <th scope="col">Thanh Toán</th>
              <th scope="col">Thông Tin Người Nhận</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td> 1</td>
              <td>
                <div className="d-flex">
                  <img
                    style={{ width: "60px" }}
                    src="https://cdn.tgdd.vn/Products/Images/42/264060/samsung-galaxy-s23-tim-glr-1.jpg"
                    alt=""
                  />
                  <div className="d-flex gap-5">
                    <div className="mt-1 fs-5">
                      <b className="text-danger">
                        Samsung Galaxy S23 5G 128GB{" "}
                      </b>
                    </div>
                    <div className="mt-3 fs-4">
                      <span>x 3</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <img
                    style={{ width: "60px" }}
                    src="https://cdn.tgdd.vn/Products/Images/42/264060/samsung-galaxy-s23-tim-glr-1.jpg"
                    alt=""
                  />
                  <div className="d-flex gap-5">
                    <div className="mt-1 fs-5">
                      <b className="text-danger">
                        Samsung Galaxy S23 5G 128GB{" "}
                      </b>
                    </div>
                    <div className="mt-3 fs-4">
                      <span>x 3</span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="fs-3 text-danger text-capitalize mt-5">
                  <b>19.555.440 đ</b>
                </div>
              </td>
              <td>
                <div className="fs-6 mt-3">
                  <p>
                    {" "}
                    <b className="text-danger text-capitalize text-left">
                      Họ tên:
                    </b>{" "}
                    Nguyễn Phương Nam
                  </p>
                  <p>
                    {" "}
                    <b className="text-danger text-capitalize text-left">
                      Địa chỉ:
                    </b>
                    11, Thuợg Phúc, tả thahoai, thanh tì ,hà nọ
                  </p>
                  <p>
                    {" "}
                    <b className="text-danger text-capitalize text-left">
                      SDT:
                    </b>{" "}
                    0346688896
                  </p>
                </div>
              </td>
              <td >
                <select className="form-select text-center mt-3 ">
                  <option value="">Chờ xác nhận</option>
                  <option value="">Đang xử lý</option>
                  <option value="">Đã giao</option>
                </select>
              </td>
              <td>
                <div className="text-center d-flex flex-column gap-4 mt-3">
                  <button className="btn btn-success"> Cập nhật</button>
                  <button className="btn btn-danger">Hùy đơn hàng</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
