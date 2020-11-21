import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../component/theme/admin/Header";
import Navbar from "../../component/theme/admin/Navbar";
import style from "../../styles/Admin/Sidebar.module.css";
import { Row, Col } from "reactstrap";
import $ from "jquery";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";
import { Button } from "reactstrap";
import FroalaEditor from "react-froala-wysiwyg";
import Axios from "axios";
import Swal from "sweetalert2";
function Dashboard(props) {
  let [about, setAbout] = useState("");
  useEffect(() => {
    Axios({
      url: `${process.env.REACT_APP_URL}books/about`,
      method: "GET",
    }).then((response) => {
      setAbout(response.data.data[0].about);
    });
  }, []);

  useEffect(() => {
    $(".sideBarBtn").show();
    $(".sideBarBtnHide").hide();
  }, []);

  let handleSave = (event) => {
    event.preventDefault();
    Axios({
      url: `${process.env.REACT_APP_URL}books/about`,
      method: "POST",
      data: {
        about: about,
      },
    }).then((response) => {
      Swal.fire({
        title: "Success",
        text: "Perubahan Di Save",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      });
    });
  };

  let EventClick = () => {
    $(".sidebar").addClass(style.sidebar12);
    $(".navbar123").addClass(style.navbar12);
    $(".sideBarBtn").hide();
    $(".body").css("margin-left", "100px");
    $(".sideBarBtnHide").show();
  };

  let EventClickShow = () => {
    $(".sideBarBtn").show();
    $(".navbar123").addClass(style.navbar13);
    $(".sidebar").removeClass(style.sidebar12);
    $(".navbar123").removeClass(style.navbar12);
    $(".sideBarBtnHide").hide();
    $(".body").css("margin-left", "10px");
  };
  return (
    <>
      <Row>
        <Col md="2">
          <div className={`${style.sidebar} sidebar`}>
            <Sidebar />
          </div>
        </Col>
        <Col md="10">
          <div className={`${style.Col2} navbar123`}>
            <Navbar eventShow={EventClickShow} event={EventClick} />
            <div className="body">
              <div className="container" style={{ height: 700 }}>
                <p style={{ fontSize: 30, fontWeight: "bold" }}>About</p>
                <FroalaEditor
                  model={about}
                  tag="textarea"
                  onModelChange={setAbout}
                />
                <Button
                  onClick={handleSave}
                  style={{ marginTop: 12 }}
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
