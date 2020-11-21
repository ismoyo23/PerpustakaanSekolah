import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
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
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../../../redux/actions/auth";
import Swal from "sweetalert2";
function NavbarMenu(props) {
  let history = useHistory();

  useEffect(() => {
    if (props.auth.data.role != 1) {
      history.push("/");
    }
  }, []);
  // ================================================================================
  // state using Hooks
  let [isOpen, setIsOpen] = useState(false);
  let toggle = () => setIsOpen(!isOpen);

  // =================================================================================
  // function for handle logout
  let logout = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You will exit this page",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Success",
          text: "Logout Success",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.value) {
            props.logout();
            history.push("/");
          }
        });
      }
    });
  };

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
                  <span className={style.username}>
                    {props.auth.data.name_user}
                  </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
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

export default connect(mapStateToProps, mapDispatchToProp)(NavbarMenu);
