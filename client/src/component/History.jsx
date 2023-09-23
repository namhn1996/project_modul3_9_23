import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

function History() {
  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <div className="row ">
          <div className="col-3 ">
            <h1>Col 2</h1>
          </div>
          <div className="col-9 bg-light">
            <h1>Col 10</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default History;
