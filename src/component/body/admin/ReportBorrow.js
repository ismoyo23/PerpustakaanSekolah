import React, { useState, useEffect } from "react";
import style from "../../../styles/Admin/Body.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Barcode from "react-barcode";
import ReactToPdf from "react-to-pdf";
import axios from "axios";
import { Input, Table, Row, Col, Card } from "reactstrap";

function ReportBorrow(props) {
  useEffect(() => {
    CountData();
  }, []);

  let [count, setCount] = useState([]);

  let CountData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}books/borrower/count?field=users.id_user`,
    }).then((response) => {
      setCount(response.data.data);
    });
  };
  return (
    <>
      <Row noGutters>
        <Col md="12" xs="12">
          <Card body className={style.CardTable}>
            <Row>
              <Col md="6">
                <p style={{ marginLeft: 12, fontWeight: "bold", fontSize: 20 }}>
                  Peminjam Terbanyak
                </p>
              </Col>
            </Row>
            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>Nisn</th>
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {count.map((data) => {
                  return (
                    <tr>
                      <td>{data.nik}</td>
                      <td>{data.name_user}</td>
                      <td>{data.class}</td>
                      <td>{data.majors}</td>
                      <td>{data.count}</td>
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

export default ReportBorrow;
