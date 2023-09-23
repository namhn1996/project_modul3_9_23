import React from "react";

function Products() {
  return (
    <div>
      <div className="col py-3">
        <h4 className="h2 text-success border-bottom border-success">
          Products
        </h4>
        <div>
          <table className="table-hover text-center">
            <thead className="bg-light">
            <tr className="table-active fs-4">
                <th >ID Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Ảnh</th>
                <th>Tồn Kho</th>
                <th>Giá Sản Phẩm</th>
                <th>Sale</th>
                <th>Thông Số</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>1</td>
                <td>Samsung Galaxy S23 5G 128GB</td>
                <td>
                  <img
                    style={{ width: "100px" }}
                    src="https://cdn.tgdd.vn/Products/Images/42/264060/samsung-galaxy-s23-tim-glr-1.jpg"
                    alt=""
                  />
                </td>
                <td>22</td>
                <td>19.555.444 đ</td>
                <td>20 %</td>
                <td>
                  <button className="btn btn-hover">
                    <i className="fa-solid fa-eye fa-2x text-danger"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-hover">
                    {" "}
                    <i className="fa-solid fa-pencil fa-2x text-success"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
