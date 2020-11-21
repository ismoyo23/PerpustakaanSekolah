import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Card, Button, CardImg, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { login, logout } from "../../../../redux/actions/auth";
import Moment from "moment";
function DetailPage(props) {
  let history = useHistory();
  let [count, setCount] = useState(1);
  let [modal, setModal] = useState(false);
  let toggle = () => setModal(!modal);
  let [id, setId] = useState(props.paramId);
  let [status, setStatus] = useState("borrower");

  let handleBorrowed = (event) => {
    event.preventDefault();
    if (props.auth.data.id_user != undefined) {
      Swal.fire({
        title: "Yakin?",
        text: "Kamu ingin meminjam buku ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          axios({
            method: "GET",
            url: `${process.env.REACT_APP_URL}books/borrower?field=users.id_user&search=${props.auth.data.id_user}&field2=borrower.id_book&search2=${id}`,
          }).then((res) => {
            if (res.data.data[0] == null) {
              axios({
                method: "POST",
                url: `${process.env.REACT_APP_URL}books/borrower`,
                data: {
                  id_book: id,
                  id_user: props.auth.data.id_user,
                  status: "Process",
                  count: count,
                  date: Moment(new Date()).format("y-MM-DD"),
                },
              }).then(() => {
                axios({
                  method: 'POST',
                  url: `${process.env.REACT_APP_URL}books/borrower/ReckBorrow`,
                  data: {
                    id_user: props.auth.data.id_user,
                    date: Moment(new Date()).format("y-MM-DD"),
                    id_books: id
                  }
                }).then(()=> {
                  Swal.fire({
                    title: "Success",
                    text: "Buku berhasil di pinjam",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.value) {
                      window.location.reload();
                    }
                  });
                })
                
              });
            } else {
              Swal.fire("Warning", "Kamu sudah meminjam buku ini", "warning");
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: "Warning",
        text: "Login terlebih dahulu",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <>
      <div className="container">
        <Row>
          <Col md="4" xs="12">
            <Card className={styles.card}>
              <CardImg
                top
                width="100%"
                height="100%"
                src={`${process.env.REACT_APP_URL}${props.idBooks.image}`}
                alt="Card image cap"
              />
            </Card>
          </Col>

          <Col style={{ marginTop: 100 }} md="7" xs="12">
            <h1 className={styles.titleHeader}>{props.idBooks.title}</h1>
            <p style={{ color: "gray" }}>Author: {props.idBooks.name_author}</p>
            <p style={{ color: "gray", marginTop: -13 }}>
              Position: {props.idBooks.rak}
            </p>
            <div
              style={{
                backgroundColor: "red",
                width: 120,
                height: 25,
                borderRadius: 40,
              }}
            >
              <p style={{ textAlign: "center", color: "white" }}>
                {props.idBooks.stok}
              </p>
            </div>

            <div className={styles.BodyComponent}>
              <Row>
                <p style={{ fontWeight: "bold" }}>Quantity: </p>
                {count <= 1 ? (
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      marginLeft: 4,
                    }}
                  >
                    limit
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCount(count - 1)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      marginLeft: 4,
                    }}
                  >
                    -
                  </Button>
                )}
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: 4,
                  }}
                >
                  {count}
                </Button>
                {count >= props.idBooks.stok ? (
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      marginLeft: 4,
                    }}
                  >
                    limit
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCount(count + 1)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      marginLeft: 4,
                    }}
                  >
                    +
                  </Button>
                )}
                <Button
                  onClick={handleBorrowed}
                  style={{
                    backgroundColor: "red",
                    marginLeft: 20,
                    color: "white",
                  }}
                >
                  Borrow
                </Button>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProp = { login, logout };

export default connect(mapStateToProps, mapDispatchToProp)(DetailPage);
