import React, { useEffect, useState } from "react";
import PDFViewer from "pdf-viewer-reactjs";
import Navbar from "../../component/theme/users/NavbarPage/index.js";
import axios from "axios";
import Footer from "../../component/body/users/FooterComponent";
function DetailBooks(props) {
  console.log(props);
  return (
    <>
      <Navbar />
      <PDFViewer
        document={{
          url: `http://localhost:3000/src/upload/CV-Arkademy-M%20Ismoyo%20Setyonowidagdo%20(3).pdf`,
        }}
      />

      <Footer />
    </>
  );
}

export default DetailBooks;
