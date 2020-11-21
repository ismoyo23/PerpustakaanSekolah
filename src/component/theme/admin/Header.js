import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavItem, NavLink } from "reactstrap";
import "font-awesome/css/font-awesome.min.css";
import style from "../../../styles/Admin/Sidebar.module.css";
import img from "../../../image/avatar.png";
import $ from "jquery";
import { Link } from "react-router-dom";
import Moment from "moment";
class Header extends Component {
  render() {
    let handleDropdown = () => {
      $(".Dropdown").addClass(style.DropShow);
    };

    let handleDropdownSettings = () => {
      $(".Dropdown").removeClass(style.DropShow);
    };
    return (
      <>
        {/* side bar */}
        {/* <Col md='2' xs="1"> */}
        <Nav vertical id="sidebar">
          <header>Library App</header>
          <div className={style.imgBar}>
            <img className={style.ImgHeader} src={img} />
            <p className={style.username}>
              <strong>Admin</strong>
            </p>
            <p className={style.position}>
              <strong>Librarian App</strong>
            </p>
          </div>

          <NavItem>
            <NavLink
              onClick={handleDropdownSettings}
              className={style.NavLink}
              href="#"
            >
              <Link
                style={{ color: "white" }}
                to={`/admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                  Date()
                ).format("y-MM-DD")}`}
              >
                <i className="fa fa-home"></i>
                <span className={style.title}>Dashboard</span>
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={handleDropdownSettings} className={style.NavLink}>
              <Link style={{ color: "white" }} to="/BorrowerData/">
                <i class="fa fa-bookmark" aria-hidden="true"></i>
                <span className={style.title}>Borrower Data</span>
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              onClick={handleDropdown}
              className={style.NavLink}
              href="#"
            >
              <i className="fa fa-cog" aria-hidden="true"></i>
              <span className={style.title}>Content</span>
            </NavLink>
            <div className={`${style.Dropdown} Dropdown`}>
              <NavLink href="/books">
             
                  <span className={style.titleDropdown}>Books</span>
             
              </NavLink>

              <NavLink href="/author">
                
                  <span className={style.titleDropdown}>Author</span>
         
              </NavLink>
              <NavLink href="/genre">
             
                  <span className={style.titleDropdown}>Genre</span>

              </NavLink>
            </div>
          </NavItem>

          <NavItem>
            <NavLink onClick={handleDropdownSettings} className={style.NavLink}>
              <Link style={{ color: "white" }} to="/user/1">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                <span className={style.title}>User Settings</span>
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={handleDropdownSettings} className={style.NavLink}>
              <Link style={{ color: "white" }} to="/About/">
                <i class="fa fa-text-width" aria-hidden="true"></i>
                <span className={style.title}>Setting About</span>
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={handleDropdownSettings} className={style.NavLink}>
              <Link style={{ color: "white" }} to="/Report">
                <i class="fa fa-line-chart" aria-hidden="true"></i>
                <span className={style.title}>Absence Report</span>
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={handleDropdownSettings} className={style.NavLink}>
              <Link style={{ color: "white" }} to="/ReportBorrow/">
                <i class="fa fa-pie-chart" aria-hidden="true"></i>

                <span className={style.title}>Loan Reports</span>
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink onClick={handleDropdownSettings} className={style.NavLink}>
              <Link style={{ color: "white" }} to="/PrintCatalog/">
              <i class="fa fa-print" aria-hidden="true"></i>

                <span className={style.title}>Print Catalog</span>
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
        {/* </Col> */}
      </>
    );
  }
}

export default Header;
