import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./style.module.css";
function FooterComponent() {
  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 10,
          marginTop: 100,
        }}
      >
        <p style={{ textAlign: "center" }}>
          <span style={{ color: "gray" }}>Powered By </span>
          <span>Tim SMK NEGERI 2 TRENGGALEK</span>
        </p>
      </div>
    </>
  );
}

export default FooterComponent;
