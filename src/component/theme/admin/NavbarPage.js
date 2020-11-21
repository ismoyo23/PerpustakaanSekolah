import React, { Component, useState } from "react";
import {
  Button,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import logo from "../../../image/avatar.png";
import style from "../../../styles/Admin/Navbar.module.css";
import $ from "jquery";
import { connect } from "react-redux";
import { login, logout } from "../../../redux/actions/auth";
function NavbarPage(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* navbar */}
      <Navbar className={`${style.NavBar} Navbar`} light expand="md">
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={props.event} className={style.NavLink} href="#">
                <lable
                  for="checkidku"
                  className={`${style.sideBarBtn} sideBarBtn`}
                >
                  <i class="fa fa-bars" aria-hidden="true"></i>
                </lable>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                onClick={props.eventShow}
                className={style.NavLink}
                href="#"
              >
                <lable
                  for="checkidku"
                  className={`${style.sideBarBtn} sideBarBtnHide`}
                >
                  <i class="fa fa-bars" aria-hidden="true"></i>
                </lable>
              </NavLink>
            </NavItem>
          </Nav>

          <NavbarText>
            <Nav>
              <UncontrolledDropdown className={style.dropdown} nav inNavbar>
                <DropdownToggle className={style.NavLink} nav caret>
                  <img src={logo} className={style.logo} />
                  <span className={style.username}>Admin</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </NavbarText>
        </Collapse>
      </Navbar>

      <div className={style.users}>
        <header>data</header>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProp = { login, logout };

export default connect(mapStateToProps, mapDispatchToProp)(NavbarPage);
