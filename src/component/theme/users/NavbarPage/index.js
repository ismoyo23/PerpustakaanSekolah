import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import "font-awesome/css/font-awesome.min.css";
import "swiper/css/swiper.css";
import "font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { genreGet } from "../../../../redux/actions/genre";
import { login } from "../../../../redux/actions/auth";
import { logout } from "../../../../redux/actions/auth";
import { absencePost } from "../../../../redux/actions/absence";
import Swal from "sweetalert2";
import {
  NavItem,
  NavLink,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  NavbarText,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import img from "../../../../image/smk.png";
import QrReader from "react-qr-reader";
import "font-awesome/css/font-awesome.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Moment from "moment";
import axios from "axios";
function NavbarPage(props) {
  const { className } = props;
  let history = useHistory();
  const [isOpenNavHeader, setIsOpenNavHeader] = useState(false);
  const toggleNavHeader = () => setIsOpenNavHeader(!isOpenNavHeader);
  const [isOpenNavGenre, setIsOpenNavGenre] = useState(false);
  const toggleNavGenre = () => setIsOpenNavGenre(!isOpenNavGenre);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let [nik, setNik] = useState("");

  const [modalQr, setModalQr] = useState(false);

  const toggleQr = () => setModalQr(!modalQr);

  useEffect(() => {
    if (props.auth.data.role == 1) {
      history.push(
        `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(Date()).format(
          "y-MM-DD"
        )}`
      );
    }
    getAllGenre();
    AOS.init({ duration: 2000 });
  }, []);
  let getAllGenre = () => {
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      Search: "",
    };
    props.genreGet(data);
  };

  let loginWithNik = (event) => {
    event.preventDefault();
    let validateData = {
      ConUrl: process.env.REACT_APP_URL,
      Search: `/?field=absence.nik&search=${nik}&field2=absence.created_at&search2=${Moment(
        Date()
      ).format("y-MM-DD")}`,
    };
    axios({
      method: "GET",
      url: `${validateData.ConUrl}books/absence/get${validateData.Search}`,
    }).then((res) => {
      if (res.data.data[0] == null) {
        let setData = {
          ConUrl: process.env.REACT_APP_URL,
          nis: nik,
          date: Moment(new Date()).format("y-MM-DD"),
       
        };
        props.absencePost(setData).then((data) => {
          let setData = {
            nik: nik,
            env: process.env.REACT_APP_URL,
          };
          props
            .login(setData)
            .then((props) => {
              console.log("response");
              if (props.value.data.data[0].role == 0) {
                Swal.fire({
                  title: "Success",
                  text: "Login Success",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Yes",
                }).then((result) => {
                  window.location.reload();
                });
              } else {
                history.push(
                  `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                    Date()
                  ).format("y-MM-DD")}`
                );
              }
            })
            .catch((err) => {
              Swal.fire({
                title: "wrong",
                text: `Please try again`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
            });
        });
      } else {
        if (nik != res.data.data[0].nik) {
          let setData = {
            ConUrl: process.env.REACT_APP_URL,
            nis: nik,
            date: Moment(new Date()).format("y-MM-DD"),
        
          };
          props.absencePost(setData).then(() => {
            let setData = {
              nik: nik,
              env: process.env.REACT_APP_URL,
            };
            props
              .login(setData)
              .then((props) => {
                console.log("response");
                if (props.value.data.data[0].role == 0) {
                  Swal.fire({
                    title: "Success",
                    text: "Login Success",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Yes",
                  }).then((result) => {
                    window.location.reload();
                  });
                } else {
                  history.push(
                    `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                      Date()
                    ).format("y-MM-DD")}`
                  );
                }
              })
              .catch((err) => {
                Swal.fire({
                  title: "wrong",
                  text: `Please try again`,
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              });
          });
        } else {
          let setData = {
            nik: nik,
            env: process.env.REACT_APP_URL,
          };
          props.login(setData).then((props) => {
         
            if (props.value.data.data[0].role == 0) {
              Swal.fire({
                title: "Success",
                text: "Login Success",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
              }).then((result) => {
                window.location.reload();
              });
            } else {
              history.push(
                `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                  Date()
                ).format("y-MM-DD")}`
              );
            }
          });
        }
      }
    });
  };

  let handleScan = (data) => {
    if (data) {
      let validateData = {
        ConUrl: process.env.REACT_APP_URL,
        Search: `/?field=absence.nik&search=${nik}&field2=absence.created_at&search2=${Moment(
          Date()
        ).format("y-MM-DD")}`,
      };
      axios({
        method: "GET",
        url: `${validateData.ConUrl}books/absence/get${validateData.Search}`,
      }).then((res) => {
        if (res.data.data[0] == null) {
          let setData = {
            ConUrl: process.env.REACT_APP_URL,
            nis: data,
            date: Moment(new Date()).format("y-MM-DD"),
          };
          props.absencePost(setData).then((data) => {
            let setData = {
              nik: data,
              env: process.env.REACT_APP_URL,
            };
            props
              .login(setData)
              .then((props) => {
                console.log("response");
                if (props.value.data.data[0].role == 0) {
                  Swal.fire({
                    title: "Success",
                    text: "Login Success",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Yes",
                  }).then(() => {
                    window.location.reload();
                  });
                } else {
                  history.push(
                    `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                      Date()
                    ).format("y-MM-DD")}`
                  );
                }
              })
              .catch((err) => {
                Swal.fire({
                  title: "wrong",
                  text: `Please try again`,
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              });
          });
        } else {
          if (data != res.data.data[0].nik) {
            let setData = {
              ConUrl: process.env.REACT_APP_URL,
              nis: data,
              date: Moment(new Date()).format("y-MM-DD"),
            };
            props.absencePost(setData).then(() => {
              let setData = {
                nik: data,
                env: process.env.REACT_APP_URL,
              };
              props
                .login(setData)
                .then((props) => {
                  console.log("response");
                  if (props.value.data.data[0].role == 0) {
                    Swal.fire({
                      title: "Success",
                      text: "Login Success",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      window.location.reload();
                    });
                  } else {
                    history.push(
                      `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                        Date()
                      ).format("y-MM-DD")}`
                    );
                  }
                })
                .catch((err) => {
                  Swal.fire({
                    title: "wrong",
                    text: `Please try again`,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                });
            });
          } else {
            let setData = {
              nik: data,
              env: process.env.REACT_APP_URL,
            };
            props.login(setData).then((props) => {
              if (props.value.data.data[0].role == 0) {
                Swal.fire({
                  title: "Success",
                  text: "Login Success",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Yes",
                }).then((result) => {
                  window.location.reload();
                });
              } else {
                history.push(
                  `admin/${Moment(Date()).format("y-MM-DD")}/${Moment(
                    Date()
                  ).format("y-MM-DD")}`
                );
              }
            });
          }
        }
      });
    }
  };

  let handleError = (err) => {
    console.error(err);
  };

  let Logout = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you leave this page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        props.logout();
      }
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {/* ================================================================== */}
      {/* modal QR */}
      <Modal isOpen={modalQr} toggle={toggleQr} className={className}>
        <ModalHeader toggle={toggleQr}>Scanning QR Code</ModalHeader>
        <ModalBody>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleQr}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* ================================================================== */}
      {/* modal */}
      <Modal
        className={styles.modalBody}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <Card>
          <CardBody>
            <input
              value={nik}
              type="number"
              onChange={(e) => setNik(e.target.value)}
              placeholder="Input Nik"
              className={styles.textInput}
            />
            <Button
              onClick={loginWithNik}
              style={{ marginTop: 12 }}
              color="primary"
            >
              Sign In
            </Button>

            <Button
              onClick={toggleQr}
              style={{ marginTop: 12, marginLeft: 12 }}
              color="primary"
            >
              Sign In using QR Code
            </Button>
          </CardBody>
        </Card>
      </Modal>
      {/* =================================================================== */}
      {/* navbar */}
      <div className={styles.navbar}>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={img} style={{ width: 50, height: 50 }} />
            <span className={styles.textNav}>SMK NEGERI 2 TRENGGALEK</span>
          </NavbarBrand>
          <div className="container">
            <NavbarToggler onClick={toggleNavHeader} />

            <Collapse isOpen={isOpenNavHeader} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/">Beranda</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about/users">Tentang</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.location.replace(
                        "https://goo.gl/maps/6PYZmBBC1z3nBGnu5"
                      );
                    }}
                  >
                    Lokasi
                  </NavLink>
                </NavItem>
              </Nav>
              <NavbarText>
                {props.auth.data.name_user == undefined ? (
                  <UncontrolledDropdown>
                    <DropdownToggle nav>
                      <span onClick={toggle}>
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        <span style={{ marginLeft: 4 }}>Sign In</span>
                      </span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                ) : (
                  <UncontrolledDropdown>
                    <DropdownToggle nav>
                      <span>
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <span style={{ marginLeft: 4 }}>
                          {props.auth.data.name_user}
                        </span>
                      </span>
                      <span style={{ marginLeft: 9 }} onClick={Logout}>
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        <span style={{ marginLeft: 4 }}>Logout</span>
                      </span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                )}
              </NavbarText>
            </Collapse>
          </div>
        </Navbar>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  AllGenre: state.genreGet,
  auth: state.auth,
  logout: state.logout,
});
const mapDispatchToProp = { genreGet, login, logout, absencePost };

export default connect(mapStateToProps, mapDispatchToProp)(NavbarPage);
