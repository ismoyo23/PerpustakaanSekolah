import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Input,
  Table,
  Row,
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import style from "../../../styles/Admin/Body.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";

import QRCode from "qrcode.react";
import ReactToPdf from "react-to-pdf";
function UsersCrud(props) {
  let history = useHistory();
  const { className } = props;

  //=======================================================================================
  // component did mount
  useEffect(() => {
    GetAllUsers();
  }, []);

  //=======================================================================================
  // State
  const [modalQR, setModalQR] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let [nameUsers, setNameUsers] = useState("");
  let [nis, setNis] = useState("");
  let [classUsers, setClassUsers] = useState("");
  let [majors, setMajors] = useState("");
  let [role, setRole] = useState("1");
  let [id, setId] = useState();
  let [modalTitle, setModalTitle] = useState("Add Users");
  let [search, setSearch] = useState("");
  let [getUser, setGetUsers] = useState([]);
  let [excel, setExcel] = useState("");
  let [modalExcel, setModalExcel] = useState(false);
  let toggleExcel = () => setModalExcel(!modalExcel);

  let toggleQR = (nis, name) => (event) => {
    event.preventDefault();
    setModalQR(!modalQR);
    setNis(nis);
    setNameUsers(name);
  };

  //=======================================================================================
  // process add and update data
  let ActionGenre = (event) => {
    event.preventDefault();
    let data = {
      // ========================================//
      // url and method
      ConUrl:
        modalTitle == "Add Users"
          ? `${process.env.REACT_APP_URL}books/user`
          : `${process.env.REACT_APP_URL}books/user/${id}`,
      Method: modalTitle == "Add Users" ? `POST` : `PUT`,
    };

    axios({
      method: data.Method,
      url: data.ConUrl,
      data: {
        name_user: nameUsers,
        nik: nis,
        class: classUsers,
        majors: majors,
        role: role,
      },
    }).then(() => {
      Swal.fire({
        title: "Success",
        text: `${modalTitle} Data Sucess`,
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

  //=======================================================================================
  // process call data from api back end
  let GetAllUsers = () => {
    let data = {
      ConUrl: process.env.REACT_APP_URL,
    };
    axios({
      method: "GET",
      url: `${data.ConUrl}books/user?search=${props.filter}&field=role`,
    }).then((response) => {
      setGetUsers(response.data.data);
    });
  };

  //=======================================================================================
  // process show data genre by id
  let ShowUsers = (id) => (event) => {
    event.preventDefault();
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      id: id,
    };
    axios({
      method: "GET",
      url: `${data.ConUrl}books/user?search=${id}&field=id_user`,
    })
      .then((response) => {
        let data = response.data.data[0];
        setId(id);
        setModal(true);
        setNameUsers(data.name_user);
        setNis(data.nik);
        setMajors(data.majors);
        setRole(data.role);
        setClassUsers(data.class);
        setModalTitle("Edit Users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //=======================================================================================
  // process delete data
  let DeleteUsers = (id) => (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Kamu akan menghapus user ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        let data = {
          ConUrl: process.env.REACT_APP_URL,
          id: id,
        };
        axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_URL}books/user/${id}`,
        }).then(() => {
          Swal.fire({
            title: "Berhasil",
            text: "Hapus data berhasil",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          });
        });
      }
    });
  };

  //=======================================================================================
  // set state to default
  let Close = () => {
    setModalTitle("Add Genre");
    setModal(false);
    setId("");
    setNameUsers("");
    setNis("");
    setMajors("");
    setClassUsers("");
  };

  // ======================================================================================
  // filter user
  let filterUsers = (filter) => {
    history.push(`/user/${filter}`);
    window.location.reload();
  };

  let closeQR = (event) => {
    event.preventDefault();
    setModalQR(false);
    setNis("");
    setNameUsers("");
  };

  let options = {
    orientation: "landscape",
    unit: "in",
    format: [200, 230],
  };

  let handleImport = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excel", excel);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}books/user/excel`,
      data: formData,
    }).then((response) => {
      Swal.fire({
        title: "Success",
        text: "Import Excel Success",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      })
        .then((result) => {
          if (result.value) {
            window.location.reload();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    });
  };
  return (
    <>
      {/* Modal Import Excel */}
      {/* =============================================================================  */}
      <Modal isOpen={modalExcel} toggle={toggleExcel} className={className}>
        <ModalHeader toggle={toggleExcel}>Upload Excel</ModalHeader>
        <ModalBody>
          <Label for="exampleFile">File</Label>
          <Input
            type="file"
            onChange={(e) => setExcel(e.target.files[0])}
            name="file"
            id="exampleFile"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleImport}>
            Import
          </Button>
          <Button color="secondary" onClick={toggleExcel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* ======================================================= */}
      {/* modal for creeate QR */}
      <ReactToPdf style={{ width: 100 }} filename={nameUsers} options={options}>
        {({ toPdf, targetRef }) => (
          <Modal
            style={{ width: 300, height: 300 }}
            isOpen={modalQR}
            toggle={toggleQR}
            className={className}
          >
            <div ref={targetRef}>
              <ModalHeader>Genrete QR</ModalHeader>
              <ModalBody>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <QRCode value={nis} />
                </div>
                <p style={{ textAlign: "center", marginTop: 12 }}>
                  Nama: {nameUsers}
                </p>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: -12,
                  }}
                >
                  Nis: {nis}
                </p>
              </ModalBody>
            </div>
            <ModalFooter>
              <Button color="primary" onClick={toPdf}>
                <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              </Button>{" "}
              <Button color="secondary" onClick={closeQR}>
                <i class="fa fa-ban" aria-hidden="true"></i>
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ReactToPdf>

      {/* ======================================================= */}
      {/* modal from add and update data*/}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={ActionGenre}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name User</Label>
                <Input
                  value={nameUsers}
                  onChange={(e) => setNameUsers(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Name Users"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Kelas</Label>
                <Input
                  value={classUsers}
                  onChange={(e) => setClassUsers(e.target.value)}
                  type="text"
                  placeholder="Class"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Jurusan</Label>
                <Input
                  value={majors}
                  onChange={(e) => setMajors(e.target.value)}
                  type="text"
                  placeholder="Majors"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Nis</Label>
                <Input
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  type="number"
                  placeholder="Nis"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect">Role</Label>
                <Input
                  onChange={(e) => setRole(e.target.value)}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  {role == 1 ? (
                    <>
                      <option selected value="1">
                        Admin
                      </option>
                      <option value="0">Users</option>
                    </>
                  ) : (
                    <>
                      <option value="1">Admin</option>
                      <option selected value="0">
                        Users
                      </option>
                    </>
                  )}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={toggleExcel}>
              Import
            </Button>
            <Button color="primary">{modalTitle}</Button>
            <Button color="secondary" onClick={Close}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      {/* ======================================================= */}
      {/* table*/}
      <Row noGutters>
        <Col md="12" xs="12">
          <Card body className={style.CardTable}>
            <Row>
              <Col md="4">
                <Button onClick={toggle} color="primary">
                  <i class="fa fa-plus" aria-hidden="true"></i> Add Users
                </Button>
              </Col>

              <Col style={{ marginLeft: 140 }} md="3">
                <FormGroup row>
                  <Input
                    onChange={(e) => filterUsers(e.target.value)}
                    type="select"
                    name="select"
                    id="exampleSelect"
                  >
                    {props.filter == 0 ? (
                      <>
                        <option value="1">Admin</option>
                        <option selected value="0">
                          Users
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="1" selected>
                          Admin
                        </option>
                        <option value="0">Users</option>
                      </>
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <Input
                  style={{ marginLeft: "auto" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={style.Search}
                  type="text"
                  placeholder="Search"
                />
              </Col>
            </Row>
            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nis</th>
                  <th>Name Users</th>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {getUser.map((users, key) => {
                  return (
                    <tr>
                      <td scope="row">{key + 1}</td>
                      <td>{users.nik}</td>
                      <td style={{ width: 200 }}>{users.name_user}</td>
                      <td>{users.class}</td>
                      <td>{users.majors}</td>
                      <td>
                        <Button
                          onClick={ShowUsers(users.id_user)}
                          color="primary"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </Button>
                        <Button
                          style={{ marginLeft: 3 }}
                          onClick={DeleteUsers(users.id_user)}
                          color="danger"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </Button>

                        <Button
                          style={{ marginLeft: 3 }}
                          onClick={toggleQR(users.nik, users.name_user)}
                          color="info"
                        >
                          <i class="fa fa-qrcode" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UsersCrud;
