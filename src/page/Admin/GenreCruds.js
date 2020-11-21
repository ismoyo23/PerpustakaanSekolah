import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../component/theme/admin/Header";
import Navbar from "../../component/theme/admin/Navbar";
import GenreCrud from "../../component/body/admin/GenreCrud";
import style from "../../styles/Admin/Sidebar.module.css";
import { Row, Col, Container } from "reactstrap";
import $ from "jquery";

class Genre extends Component {
  componentDidMount() {
    $(".sideBarBtn").show();
    $(".sideBarBtnHide").hide();
  }

  render() {
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
                <GenreCrud />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Genre;
