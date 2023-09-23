import Swal from "sweetalert2";
export const showMessage = (icon, message) => {
  return Swal.fire({
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const confirmAddCart = async () => {
  return Swal.fire({
    title: "Bạn muốn thêm sản phẩm này vào giỏ hàng?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đúng rồi a Zai!!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Đã thêm vào giỏ hàng",
        "Anh zai vào giỏ hàng để check nhé !!",
        "success"
      );
    } else {
      Swal.fire("Hủy thành công", "Chúc bạn mua sắm vui vẻ !!", "success");
    }
    return result; // Trả về result từ trong .then()
  });
};

export const daCoTrongCart = async () => {
  const result = await Swal.fire({
    title: "Sản phẩm đã có trong giỏ hàng?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Cho tôi đặt thêm cái nữa !!",
    denyButtonText: `Tôi biết rồi !`,
  });
  /* Đọc thêm về isConfirmed, isDenied dưới đây */
  if (result.isConfirmed) {
    Swal.fire("Đã thêm vào giỏ hàng", "", "success");
    return { isConfirmed: true };
  } else if (result.isDismissed) {
    Swal.fire("Không thêm vào giỏ hàng !", "", "info");
    return { isDenied: true };
  }
};

export const thanhtoan = async () => {
  return Swal.fire({
    title: "Bạn có muốn tiếp tục đặt hàng không ạ ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Tiếp tục",
    cancelButtonText: "Hủy",
  }).then((result) => {
    console.log();
    if (result.isConfirmed) {
      return Swal.fire(
        "Đặt hàng thành công !! ",
        "Chúng tôi sẽ liên hệ xác nhận đơn hàng với bạn sớm nhất !!",
        "success"
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log("hủy ok");
    }
  });
};
export const vnd = (price) => {
  price = price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  return price;
};
