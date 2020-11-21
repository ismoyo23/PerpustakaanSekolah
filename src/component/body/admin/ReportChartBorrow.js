import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";
import { Row, Col, Container, CardBody, Card, Button } from "reactstrap";
import ReactToPdf from "react-to-pdf";
import CanvasJSReact from "../../../canvas/canvasjs.react";
import axios from "axios";
import Moment from "moment";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";

function ReportChartBorrow(props) {
  let history = useHistory();
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
  let [point, setPoint] = useState([]);
  let [param, setParam] = useState(new Date());
  let [param2, setParam2] = useState(new Date());
  let datePush = [];
  console.log(datePush);
  useEffect(() => {
    countChart();
  }, []);

  let countChart = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}books/borrower/count?field=id_books`,
    }).then((response) => {
      setPoint(response.data.data);
    });
  };

  for (let i = 0; i < point.length; i++) {
    datePush.push({
      label: point[i].title,
      y: point[i].count,
    });
  }

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Laporan Peminjaman"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}",
      dataPoints: datePush
    }]
  }


  return (
    <>
      <Row noGutters>
        <Col md="12" xs="12">
          <Container style={{ height: 600 }}>
            <Card style={{ height: 400 }}>
              <CardBody>
                <div
                  style={{
                    
                    width: "100%",
                    height: 300,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      marginLeft: 90,
                      width: "100%",
                      marginTop: 16,
                    }}
                  >

                  </div>
                  {/* ======================== */}
                        <CardBody>
                          <div
                            style={{
                              marginTop: 20,
                              width: "100%",
                              height: 300,
                            }}
                          >
                            <div style={{ width: 980, overflow: "scroll" }}>
                          
                                <div
                                  style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    marginLeft: 40,
                                  }}
                                >
                       
                                </div>
                                <div style={{ width: 900, height: 400 }}>
                                  <CanvasJSChart
                                    options={options}
                                    /* onRef={ref => this.chart = ref} */
                                  />
                                </div>
                         
                            </div>
                          </div>
                        </CardBody>
                 
              
                  {/* ======================== */}
                </div>
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default ReportChartBorrow;
