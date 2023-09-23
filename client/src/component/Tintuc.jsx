import React from "react";
import "../css/tintuc.css";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
function Tintuc() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="body-tintuc ">
          <div className="tintuc-info">
            <a
              href="http://doanhnghiepvn.vn/cong-nghe/danh-gia-smartphone-chip-s660-ram-8-gb-gia-6-99-trieu-tai-viet-nam/2018112603315443"
              target="_blank"
            >
              <img src="img/tintuc/tintuc1.png" />
              <h2>
                Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt
                Nam
              </h2>
            </a>
            <br />
            <h5>Doanh ngiệp 3 giờ</h5>
          </div>
          <div className="tintuc-info">
            <a
              href="https://thanhnien.vn/cong-nghe/kham-pha-smartphone-man-hinh-gap-duoc-dau-tien-cua-samsung-1027111.html"
              target="_blank"
            >
              <img src="img/tintuc/tintuc2.png" />
              <h2>
                Khám phá smartphone màn hình gập được đầu tiên của Samsung
              </h2>
            </a>
            <br />
            <h5>Thanh niên 6 giờ</h5>
          </div>
          <div className="tintuc-info">
            <a
              href="https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov"
              target="_blank"
            >
              <img src="img/tintuc/tintuc3.png" />
              <h2>
                Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại
                iPhone X
              </h2>
            </a>
            <br />
            <h5>VOV 6 giờ</h5>
          </div>
          <div className="tintuc-info">
            <a
              href="http://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html"
              target="_blank"
            >
              <img src="img/tintuc/tintuc4.png" />
              <h2>
                Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera
              </h2>
            </a>
            <br />
            <h5>VietQ 13 giờ</h5>
          </div>
          <div className="tintuc-info" style={{ borderBottom: 0 }}>
            <a
              href="https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html"
              target="_blank"
            >
              <img src="img/tintuc/tintuc5.png" height="148px" width="224px;" />
              <h2>
                Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018
              </h2>
            </a>
            <br />
            <h5>Zing 9 giờ</h5>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tintuc;