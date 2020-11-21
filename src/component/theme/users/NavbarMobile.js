import React, { useState, useEffect } from "react";
import style from "../../../styles/Users/Navbar.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { login, logout } from "../../../redux/actions/auth";
import $ from "jquery";
import {
  NavLink,
  Button,
  Input,
  Modal,
  ModalBody,
  FormGroup,
  Card,
} from "reactstrap";

function NavbarMobile(props) {
  let history = useHistory();
  const { buttonLabel, className } = props;

  // =========================================================
  // state using Hooks
  const [modal, setModal] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  const login = () => setModalLogin(!modalLogin);
  const register = () => setModal(!modal);

  let [user, setUser] = useState("false");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  let [role, setRole] = useState("0");

  let showPopUp = (event) => {
    event.preventDefault();
    $(".userHide").css("visibility", "visible");
    $(".userShow").css("visibility", "hidden");
    $(".popShow").addClass(style.visibilityShow);
  };
  let showPopHide = (event) => {
    event.preventDefault();
    $(".userShow").css("visibility", "visible");
    $(".userHide").css("visibility", "hidden");
    $(".popShow").removeClass(style.visibilityShow);
  };
  // =========================================================
  // Handle Login

  let HandleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      env: process.env.REACT_APP_URL,
    };

    if (data.username.length === 0 && data.password.length === 0) {
      $(".alert").html(
        '<div class="alert alert-danger" role="alert">form is required</div>'
      );
    } else {
      props.login(data).then((props) => {
        if (props.action.payload.data.data[0].role == 0) {
          Swal.fire({
            title: "Success",
            text: "Login Success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Login Success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.value) {
              history.push("/admin");
            }
          });
        }
      });
    }
  };

  // =========================================================
  // Handle Register
  let HandleRegister = (event) => {
    event.preventDefault();
    if (
      (username.length == 0 || password.length == 0,
      email.length == 0,
      address.length == 0)
    ) {
      $(".alert-register").html(
        '<div class="alert alert-danger" role="alert">form is required</div>'
      );
    } else {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}books/register`,
        data: {
          name_user: username,
          email: email,
          password: password,
          address: address,
          role: role,
        },
      })
        .then((response) => {
          Swal.fire({
            title: "Success",
            text: "Regiter Success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // =========================================================
  // Set Icon User with conditions
  let IconUser = (props) => {
    if (props.localStorage == null) {
      return (
        <Card body inverse className={`${style.cardProfile} popShow`}>
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          <strong>Not logged in</strong>
          <span>
            <button onClick={props.login} className={style.btnLogin}>
              Login
            </button>
            <button onClick={props.register} className={style.btnRegister}>
              Register
            </button>
          </span>
        </Card>
      );
    } else {
      return (
        <Card body inverse className={`${style.cardProfile} popShow`}>
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          <strong>{props.user}</strong>
          <span>
            <button onClick={props.logout} className={style.btnLogin}>
              Logout
            </button>
            <button onClick={register} className={style.btnRegister}>
              Profile
            </button>
          </span>
        </Card>
      );
    }
  };
  // =========================================================
  // function Logout

  let logout = () => {
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
      {/* ====================================================================== */}
      {/* Modal Login */}
      <Modal
        style={{ marginLeft: "40px" }}
        className={style.ModalLogin}
        isOpen={modalLogin}
        toggle={login}
      >
        <ModalBody className={style.ModalBackGrond}>
          <div className={style.IconModalColor}>
            <i class="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <p className={style.TextHeader}>Login</p>
          <div className="alert"></div>
          <form onSubmit={HandleLogin}>
            <FormGroup>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={`${style.InputMedia} username`}
                type="text"
                name="email"
                id="exampleEmail"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`${style.InputMedia} password`}
                name="email"
                id="exampleEmail"
                placeholder="Password"
              />
            </FormGroup>

            <Button style={{ width: "100%" }} color="primary">
              Login
            </Button>
          </form>
        </ModalBody>
      </Modal>

      {/* ====================================================================== */}
      {/* Modal Regiter */}
      <Modal
        style={{ marginLeft: "40px" }}
        className={style.ModalLogin}
        isOpen={modal}
        toggle={register}
      >
        <ModalBody className={style.ModalBackGrond}>
          <div className={style.IconModalColor}>
            <i class="fa fa-user-circle" aria-hidden="true"></i>
          </div>
          <p className={style.TextHeader}>Register</p>
          <div className="alert-register"></div>
          <form onSubmit={HandleRegister}>
            <FormGroup>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={style.InputMedia}
                type="text"
                id="exampleEmail"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Input
                value={email}
                className={style.InputMedia}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="exampleEmail"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                value={password}
                type="password"
                className={style.InputMedia}
                onChange={(e) => setPassword(e.target.value)}
                name="text"
                id="exampleEmail"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              <Input
                value={address}
                className={style.InputMedia}
                type="text"
                id="exampleEmail"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </FormGroup>
            <Button style={{ width: "100%" }} color="primary">
              Register
            </Button>
          </form>
        </ModalBody>
      </Modal>
      <span className={`${style.navbarIconShow} userShow`}>
        <i
          onClick={showPopUp}
          class="fa fa-user-circle-o"
          aria-hidden="true"
        ></i>
      </span>
      <span className={`${style.navbarIconHide} userHide`}>
        <i
          onClick={showPopHide}
          class="fa fa-user-circle-o"
          aria-hidden="true"
        ></i>
      </span>
      <IconUser
        user={props.auth.data.name_user}
        logout={logout}
        login={login}
        register={register}
        localStorage={props.auth.data.name_user}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProp = { login, logout };

export default connect(mapStateToProps, mapDispatchToProp)(NavbarMobile);
