import React from "react";

const Footer = () => {
  return (
    <footer className="text-light">
      <div
        style={{ width: "12em", border: "none", background: "none" }}
        className="card"
      >
        <div className="card-header">
          <div className="card-title">Links</div>
        </div>

        <div className="card-body"></div>
      </div>
      <div
        style={{ width: "12em", border: "none", background: "none" }}
        className="card"
      >
        <div className="card-header">
          <div className="card-title">Contact</div>
        </div>
      </div>
      <div
        style={{ width: "12em", border: "none", background: "none" }}
        className="card"
      >
        <div className="card-header">
          <div className="card-title">Copyright</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
