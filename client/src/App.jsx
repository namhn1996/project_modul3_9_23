import Gioithieu from "./component/Gioithieu";
import Tintuc from "./component/Tintuc";
import Tuyendung from "./component/Tuyendung";
import Baohanh from "./component/Baohanh";
import Lienhe from "./component/Lienhe";
import HomePage from "./component/HomePage";
import ChitietSp from "./component/ChitietSp";
import Giohang from "./component/Giohang";
import Login from "./component/Login";
import Reg from "./component/Reg";
import { Routes, Route } from "react-router-dom";
import Lichsu from "./component/Lichsu";
import History from "./component/History";
import AdminLogin from "./component/admin/AdminLogin";
import Admin from "./component/admin/Admin";
import DashBoard from "./component/admin/com/DashBoard";
import Order from "./component/admin/com/Order";
import Products from "./component/admin/com/Products";
import UserProfile from "./component/admin/com/UserProfile";

function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tintuc" element={<Tintuc />} />
        <Route path="/tuyendung" element={<Tuyendung />} />
        <Route path="/gioithieu" element={<Gioithieu />} />
        <Route path="/baohanh" element={<Baohanh />} />
        <Route path="/lienhe" element={<Lienhe />} />
        <Route path="/detail/:id" element={<ChitietSp />} />
        <Route path="/cart" element={<Giohang />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/history/:id" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin/orders" element={<Order />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/users" element={<UserProfile />} />  */}
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
