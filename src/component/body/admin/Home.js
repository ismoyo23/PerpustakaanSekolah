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
  FormGroup,
} from "reactstrap";
import style from "../../../styles/Admin/Body.module.css";
import { connect } from "react-redux";
import { borrowGet, borrowAction } from "../../../redux/actions/borrow";
import { login } from "../../../redux/actions/auth";
import { absenceGet, absencePost } from "../../../redux/actions/absence";
import Swal from "sweetalert2";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import Workbook from "react-excel-workbook";

import "react-datepicker/dist/react-datepicker.css";
function Home(props) {
  let history = useHistory();
  useEffect(() => {
    getBorrowed();
    GetAbsence();
  }, []);

  let { className } = props;
  let [modal, setModal] = useState(false);
  let toggle = () => setModal(!modal);
  let [modalProcess, setModalProcess] = useState(false);
  let toggleProcess = () => setModalProcess(!modalProcess);
  let [idBorrowed, setIdBorrowed] = useState("");
  let [date, setDate] = useState(new Date());
  let [historyDateName, setHistoryDateName] = useState(new Date());
  let [historyDateFilter, setHistoryDateFilter] = useState(new Date());
  let [startDate, setStartDate] = useState(new Date());
  let [count, setCount] = useState("");
  let [idUser, setIdUser] = useState("");
  let [idBooks, setIdBooks] = useState("");
  let getBorrowed = () => {
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      params:
        props.borrowFilter == undefined
          ? ``
          : `?field=borrower.create_at&search=${props.borrowFilter}`,
    };
    props.borrowGet(data).catch((error) => {
      console.log(error);
    });
  };
  let GetAbsence = () => {
    let data = {
      Search:
        props.filter == undefined
          ? ""
          : `/?field=absence.created_at&search=${props.filter}`,
      ConUrl: process.env.REACT_APP_URL,
    };
    props.absenceGet(data);
  };

  // let handleScan = (data) => {
  //   if (data) {
  //     let validateData = {
  //       ConUrl: process.env.REACT_APP_URL,
  //       Search: `/?field=absence.nik&search=${data}&field2=absence.created_at&search2=${Moment(
  //         Date()
  //       ).format("y-MM-DD")}`,
  //     };
  //     axios({
  //       method: "GET",
  //       url: `${validateData.ConUrl}books/absence/get${validateData.Search}`,
  //     }).then((res) => {
  //       // =============================================//
  //       if (res.data.data[0] == null) {
  //         let setData = {
  //           ConUrl: process.env.REACT_APP_URL,
  //           nis: data,
  //         };
  //         props.absencePost(setData).then((data) => {
  //           Swal.fire("Success!", "Check Log Success.", "success");
  //         });
  //       }
  //       // ==============================================
  // else {
  //   if (data == res.data.data[0].nik) {
  //     Swal.fire("warning", "Kamu sudah login hari ini", "warning");
  //   }
  //   // =========================================
  //   else {
  //     let setData = {
  //       ConUrl: process.env.REACT_APP_URL,
  //       nis: data,
  //     };
  //     props.absencePost(setData).then(() => {
  //       Swal.fire("Success!", "Check Log Success.", "success");
  //     });
  //   }
  //       }
  //     });
  //   }
  // };

  // let handleError = (err) => {
  //   console.log(err);
  // };

  let HandleReturn = (id) => (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Yakin?",
      text: "Buku akan di kembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        let data = {
          ConUrl: process.env.REACT_APP_URL,
          id: id,
        };

        props
          .borrowAction(data)
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Buku di kembalikan!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Yes",
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
    });
  };

  let handleDate = (event) => {
    event.preventDefault();
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_URL}books/borrower/${idBorrowed}`,
      data: {
        id_books: idBooks,
        status: "Borrowed",
        date: Moment(Date()).format("y-MM-DD"),
        updated_at: date,
        id_user: idUser,
        count: count,
      },
    }).then(() => {
      Swal.fire({
        title: "Success",
        text: "Tanggal sudah di setting",
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

  let filterAbsence = (data) => {
    setHistoryDateFilter(props.filter);
    let historyDate = Moment(historyDateFilter).format("YYYY-MM-DD");
    let date = Moment(data).format("YYYY-MM-DD");
    history.push(`/admin/${date}/${historyDate}`);
    window.location.reload();
  };

  let filterBorrow = (data) => {
    setHistoryDateName(Moment(props.name).format("YYYY-MM-DD"));
    let historyDate = Moment(historyDateName).format("YYYY-MM-DD");
    let date = Moment(data).format("YYYY-MM-D");
    history.push(`/admin/${historyDate}/${date}`);
    window.location.reload();
  };

  let processModals = (created_at, id_borrower, id_book, count, id_user) => (
    event
  ) => {
    event.preventDefault();
    setModalProcess(!modalProcess);
    setStartDate(Moment(created_at).format("DD/MM/YYYY"));
    setIdBorrowed(id_borrower);
    setIdUser(id_user);
    setCount(count);
    setIdBooks(id_book);
  };

  let handleChange = (data) => {
    setDate(data);
  };

  return (
    <>
      {/* modal proccess */}
      <Modal isOpen={modalProcess} toggle={toggleProcess} className={className}>
        <ModalHeader toggle={toggleProcess}>
          Atur Tanggal Pengembalian
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
              <Input
                value={startDate}
                disabled
                style={{
                  height: 31,
                }}
              />
            </Col>
            <Col md="6">
              <DatePicker selected={date} onChange={handleChange} />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDate}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleProcess}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* body */}
      <Row style={{ marginTop: "1px", marginRight: 12 }} noGutters>
       

        <Col md="6" xs="12">
          <Card body className={style.CardTable}>
            <Row>
              <Col style={{ marginBottom: 20 }} md="6">
                <DatePicker
                  selected={new Date()}
                  style={{ width: 12 }}
                  onChange={filterBorrow}
                />
              </Col>
              <p style={{ marginLeft: "auto" }}>
                {Moment(props.borrowFilter).format("DD MMMM y")}
              </p>
            </Row>
            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nisn</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                  <th>Judul</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {props.borrowCrud.data.map((borrow, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{borrow.nik}</td>
                      <td>{Moment(borrow.create_at).format("DD MMMM y")}</td>
                      <td>{Moment(borrow.create_at).format("HH:mm")}</td>
                      <td>{borrow.name_user}</td>
                      <td>{borrow.class}</td>
                      <td>{borrow.majors}</td>
                      <td>{borrow.title}</td>
                      <td>
                        {borrow.status == "Borrowed" ? (
                          <Button
                            onClick={HandleReturn(borrow.id_borrower)}
                            color="danger"
                          >
                            Return
                          </Button>
                        ) : (
                          <Button
                            onClick={processModals(
                              borrow.create_at,
                              borrow.id_borrower,
                              borrow.id_book,
                              borrow.count,
                              borrow.id_user
                            )}
                            color="info"
                          >
                            {borrow.status}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md="6" xs="12">
          <Card body className={style.CardTable}>
            <div style={{ width: "100%" }}>
              <Row>
                <Workbook
                  style={{ marginLeft: 20 }}
                  filename={(Moment(Date()).format("DD-MM-YYYY"), "Absen.xlsx")}
                  element={
                    <button
                      style={{ marginLeft: 10, marginTop: -2 }}
                      className="btn btn-primary"
                    >
                      <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                    </button>
                  }
                >
                  <Workbook.Sheet
                    data={props.absenceData.data.name_user}
                    name="Sheet A"
                  >
                    <Workbook.Column label="Foo" value="foo" />
                    <Workbook.Column label="Bar" value="bar" />
                  </Workbook.Sheet>

                  <Workbook.Sheet
                    data={props.absenceData.data}
                    name="Another sheet"
                  >
                    <Workbook.Column label="Double aaa" value="asas" />
                    <Workbook.Column label="Cubed ccc " value="SDAD" />
                  </Workbook.Sheet>
                </Workbook>

                <FormGroup
                  style={{
                    marginTop: -2,
                    width: 10,
                    marginLeft: 5,
                  }}
                  row
                >
                  <DatePicker
                    selected={new Date()}
                    style={{ width: 12 }}
                    onChange={filterAbsence}
                  />
                </FormGroup>

                <p style={{ marginLeft: "auto" }}>
                  {Moment(props.filter).format("DD MMMM y")}
                </p>
              </Row>
            </div>

            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                </tr>
              </thead>
              <tbody>
                {props.absenceData.data.map((borrow, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td style={{ width: 120 }}>{borrow.name_user}</td>

                      <td>{borrow.class}</td>
                      <td>{borrow.majors}</td>
                      <td>{Moment(borrow.created_at).format("DD MMMM y")}</td>
                      <td>{Moment(borrow.created_at).format("HH:mm")}</td>
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

let mapStateToProps = (state) => ({
  borrowCrud: state.borrowGet,
  auth: state.auth,
  absenceData: state.absenceGet,
});
const mapDispatchToProp = {
  borrowGet,
  login,
  borrowAction,
  absenceGet,
  absencePost,
};

export default connect(mapStateToProps, mapDispatchToProp)(Home);
