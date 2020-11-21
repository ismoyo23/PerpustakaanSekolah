import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Card,
  Button,
  Row,
  Col,
  Input,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Moment from "moment";
function BorrowerPage(props) {
  let history = useHistory();

  return (
    <>
      <Col md="2" xs="6">
        <Card
          data-aos="fade-up"
          style={{ width: 180, height: 500, marginTop: 90 }}
          className={styles.card}
        >
          <CardImg
            top
            width="100%"
            style={{ height: 300 }}
            src={`${process.env.REACT_APP_URL}${props.borrow.image}`}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle style={{ fontWeight: "bold" }}>
              {props.borrow.title}
            </CardTitle>
            <CardSubtitle style={{ fontSize: 15, color: "gray" }}>
              Rak: {props.borrow.rak}
            </CardSubtitle>
            <CardSubtitle
              style={{
                fontSize: 15,
                color: "gray",
                marginTop: 1,
              }}
            >
              Borrow: {Moment(props.borrow.created_at).format("DD MM YYYY")}
            </CardSubtitle>
            {props.borrow.status != "Borrowed" ? (
              <CardSubtitle
                style={{
                  fontSize: 15,
                  color: "gray",
                  marginTop: 1,
                }}
              >
                Return: Not set
              </CardSubtitle>
            ) : (
              <CardSubtitle
                style={{
                  fontSize: 15,
                  color: "gray",
                  marginTop: 1,
                }}
              >
                Return: {Moment(props.borrow.updated_at).format("DD MM YYYY")}
              </CardSubtitle>
            )}
            {props.borrow.status != "Borrowed" ? (
              <Button
                onClick={() => history.push(`/DetailBooks/${props.borrow.id}`)}
                style={{
                  marginTop: 20,
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "black",
                  color: "black",
                }}
              >
                Process
              </Button>
            ) : (
              <>
                {Moment(props.borrow.updated_at).format("y-MM-DD") >=
                Moment(Date()).format("y-MM-DD") ? (
                  <Button
                    style={{
                      marginTop: 20,
                      width: "100%",
                      backgroundColor: "white",
                      borderWidth: 2,
                      borderColor: "black",
                      color: "black",
                    }}
                  >
                    Late
                  </Button>
                ) : (
                  <Button
                    style={{
                      marginTop: 20,
                      width: "100%",
                      backgroundColor: "white",
                      borderWidth: 2,
                      borderColor: "black",
                      color: "black",
                    }}
                  >
                    Borrowed
                  </Button>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
      {/* list books
      <Col md="2" xs="6">
        <div className={style.cardBody}>
          <Card>
            <div className={style.front}>
              <img
                className={style.imgCard}
                src={`${process.env.REACT_APP_URL}${props.borrow.image}`}
                alt="Image None"
              />
            </div>

            <div className={style.back}>
              <Card
                className={style.text}
                style={{ height: "270px", width: "100%" }}
              >
                <CardBody>
                  <CardTitle>{props.borrow.title}</CardTitle>
                  <CardText>{Date(props.borrow.create_at)}</CardText>
                  <Button color="danger">Borrowed</Button>
                </CardBody>
              </Card>
            </div>
          </Card>
        </div>
      </Col> */}
    </>
  );
}

export default BorrowerPage;
