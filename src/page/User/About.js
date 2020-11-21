import React, { useEffect, useState } from "react";
import Navbar from "../../component/theme/users/NavbarPage/index.js";
import Axios from "axios";
import Footer from "../../component/body/users/FooterComponent";
import { Card, CardImg, CardText, CardBody } from "reactstrap";
import renderHTML from "react-render-html";
function About(props) {
  let [about, setAbout] = useState("");
  useEffect(() => {
    Axios({
      url: `${process.env.REACT_APP_URL}books/about`,
      method: "GET",
    }).then((response) => {
      setAbout(response.data.data[0].about);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div style={{ height: 900 }}>
          <Card>
            <CardImg
              top
              width="100%"
              src="/assets/318x180.svg"
              alt="Card image cap"
            />
            <CardBody style={{ marginTop: 100 }}>
              <CardText>{renderHTML(about)}</CardText>
            </CardBody>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
