import React, { useState } from "react";

function UserProfile() {
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = () => {
    setIsLocked(!isLocked);
  };
  return (
    <div className="py-3">
      <h4 className="h2 text-success border-bottom border-success">
        Tài Khoản Khách Hàng
      </h4>
      <div className="container-fluid">
        <table className="table-hover text-center">
          <thead className="bg-light ">
            <tr className="table-active">
              <th scope="col">ID Khách Hàng</th>
              <th scope="col">Họ Tên</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Mật Khẩu</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td> 1</td>
              <td> Nam</td>
              <td>SDT</td>
              <td>Mail</td>
              <td>pass</td>
              <td>11, Thuợg Phúc, tả thahoai, thanh tì ,hà nọ</td>
              <td>
                <b>{isLocked ? "Đã khóa" : "Hoạt động"}</b>
              </td>
              <td>
                <button
                  className={isLocked ? "btn btn-danger" : "btn btn-success "}
                  onClick={handleClick}
                >
                  {isLocked ? "Khóa" : "Mở"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserProfile;
