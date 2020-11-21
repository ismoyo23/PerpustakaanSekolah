import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";
import { Row, Col, Container, CardBody, Card, Button } from "reactstrap";
import ReactToPdf from "react-to-pdf";
import CanvasJSReact from "../../../canvas/canvasjs.react";
import axios from "axios";
import Moment from "moment";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";

function ReportChart(props) {
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
    let data =
      props.param == undefined
        ? ""
        : `?param=${props.param}&param2=${props.param2}`;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}books/absence/count/${data}`,
    }).then((response) => {
      setPoint(response.data.data);
    });
  };

  for (let i = 0; i < point.length; i++) {
    datePush.push({
      label: Moment(point[i].date).format("DD MMMM YYYY"),
      y: point[i].count,
    });
  }

  let options = {
    title: {
      text: "Laporan Absensi",
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: datePush,
      },
    ],
  };

  let filterChart = (event) => {
    event.preventDefault();
    let data = {
      param: Moment(param).format("y-MM-DD"),
      param2: Moment(param2).format("y-MM-DD"),
    };
    history.push(`/filterReport/${data.param}/${data.param2}`);
    window.location.reload();
  };

  let filterAll = (event) => {
    event.preventDefault();
    history.push("/report");
    window.location.reload();
  };

  let option = {
    orientation: "landscape",
    unit: "in",
    format: [900, 900],
  };
  return (
    <>
      <Row noGutters>
        <Col md="12" xs="12">
          <Container style={{ height: 600 }}>
            <Card style={{ height: 400 }}>
              <CardBody>
                <div
                  style={{
                    marginTop: 20,
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
                    <Row>
                      <div>
                        <DatePicker selected={param} onChange={setParam} />
                      </div>
                      <p style={{ marginLeft: 12 }}>sd</p>
                      <div style={{ marginLeft: 20 }}>
                        <DatePicker
                          style={{ marginLeft: 19 }}
                          selected={param2}
                          onChange={setParam2}
                        />
                      </div>
                      <Button
                        onClick={filterChart}
                        style={{ width: 40, marginLeft: 19, marginTop: -11 }}
                        color="light"
                      >
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </Button>
                      <Button
                        onClick={filterAll}
                        style={{ width: 60, marginLeft: 19, marginTop: -11 }}
                        color="light"
                      >
                        All
                      </Button>
                    </Row>
                  </div>
                  {/* ======================== */}

                  <ReactToPdf
                    style={{ width: 100 }}
                    filename={`${Moment(props.param).format(
                      "DD MMMM YYYY"
                    )} sd ${Moment(props.param2).format("DD MMMM YYYY")}`}
                    options={option}
                  >
                    {({ toPdf, targetRef }) => (
                      <>
                        <Button
                          style={{ width: 40, marginLeft: 19, marginTop: 12 }}
                          color="primary"
                          onClick={toPdf}
                        >
                          <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        </Button>

                        <CardBody>
                          <div
                            style={{
                              marginTop: 20,
                              width: "100%",
                              height: 300,
                            }}
                          >
                            <div style={{ width: 980, overflow: "scroll" }}>
                              <div ref={targetRef}>
                                <div
                                  style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    marginLeft: 40,
                                  }}
                                >
                                  <Row>
                                    {props.param == undefined ? (
                                      <p>All</p>
                                    ) : (
                                      <>
                                        <p>
                                          {Moment(props.param).format(
                                            "DD MMMM y"
                                          )}
                                        </p>
                                        <p style={{ marginLeft: 12 }}>sd</p>
                                        <p style={{ marginLeft: 12 }}>
                                          {Moment(props.param2).format(
                                            "DD MMMM y"
                                          )}
                                        </p>
                                      </>
                                    )}
                                  </Row>
                                </div>
                                <div style={{ width: 900, height: 400 }}>
                                  <CanvasJSChart
                                    options={options}
                                    /* onRef={ref => this.chart = ref} */
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </>
                    )}
                  </ReactToPdf>
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

export default ReportChart;
