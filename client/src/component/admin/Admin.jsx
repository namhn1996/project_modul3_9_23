import React from "react";
import SideBar from "./com/SideBar";
import { Outlet } from "react-router-dom";


function Admin() {
  return (
    <div className="container-fluid mt-5">
      <div className="row flex-nowrap">
        <SideBar />
      </div>
    </div>
  );
}

export default Admin;
