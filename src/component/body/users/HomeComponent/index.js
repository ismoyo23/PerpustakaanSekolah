import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import "font-awesome/css/font-awesome.min.css";
import "swiper/css/swiper.css";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { genreGet } from "../../../../redux/actions/genre";
import { login } from "../../../../redux/actions/auth";
import { logout } from "../../../../redux/actions/auth";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from "reactstrap";

import img2 from "../../../../image/orangBaca3.jpg";
import Swal from "sweetalert2";
import "font-awesome/css/font-awesome.min.css";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function HomePage(props) {
  let history = useHistory();
  let [dataBooks, setDataBooks] = useState([]);
  useEffect(() => {
    getAllBooks();
    
    if (dataBooks === null) {
      Swal.fire({
        title: "Im Sorry",
        text: `Data not found`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        history.push("/");
      });
    }
  }, []);
  const [data, setData] = React.useState("Not Found");
  const [isOpenNavHeader, setIsOpenNavHeader] = useState(false);
  const toggleNavHeader = () => setIsOpenNavHeader(!isOpenNavHeader);
  const [isOpenNavGenre, setIsOpenNavGenre] = useState(false);
  const toggleNavGenre = () => setIsOpenNavGenre(!isOpenNavGenre);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let [search, setSearch] = useState("");

  let getAllBooks = () => {
    let SearchBooks =
      props.search === undefined
        ? ""
        : `&search=${props.search}&field=id`;
    let genre =
      props.category == undefined
        ? ""
        : `&search=${props.category}&field=genre.name_genre`;
    let SortBooks = props.sort == undefined ? `/?sort=ASC` : `/?sort=DESC`;
    axios({
      url: `${process.env.REACT_APP_URL}books${SortBooks}${SearchBooks}${genre}`,
    }).then((response) => {
      setDataBooks(response.data.data);
    });
  };

  let searchBooks = () => {
    let SearchBooks =
      search === undefined
        ? ""
        : `&search=${search}&field=title`;
    let genre =
      props.category == undefined
        ? ""
        : `&search=${props.category}&field=genre.name_genre`;
    let SortBooks = props.sort == undefined ? `/?sort=ASC` : `/?sort=DESC`;
    axios({
      url: `${process.env.REACT_APP_URL}books${SortBooks}${SearchBooks}${genre}`,
    }).then((response) => {
      setDataBooks(response.data.data);
    });
  };

  let handleSearch = (event) => {
    event.preventDefault();
    if (search == "") {
      history.push(`/`);
      window.location.reload();
    } else {
      history.push(`/search/${search}`);
      window.location.reload();
    }
  };

  let handleCategory = (category) => (event) => {
    event.preventDefault();
    if (category == "All") {
      history.push("/");
      window.location.reload();
    } else {
      history.push(`/category/${category}`);
      window.location.reload();
    }
  };

  let handleSort = (sort) => (event) => {
    event.preventDefault();
    if (sort == "ASC") {
      history.push("/");
      window.location.reload();
    } else {
      history.push(`sort/${sort}`);
      window.location.reload();
    }
  };
  const { buttonLabel, className } = props;

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Search Books</ModalHeader>
        <ModalBody>
          <BarcodeScannerComponent
            width={460}
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData("Not Found");

              if (result) {
                handleSearch(result.text);
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <div
        style={{
          backgroundImage: `url("${img2}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "590px",

          backgroundAttachment: "fixed",
        }}
      >
        <div className={styles.backgroundColorTransparent}></div>
        <p data-aos="fade-up" className={styles.textHeader}>
          SELAMAT DATANG
        </p>
        <p data-aos="fade-up" className={styles.textTitle}>
          Pilih buku yang kamu suka, kembalikan tepat waktu
        </p>

        <Button
          onClick={() => history.push("borowerbooks")}
          data-aos="fade-up"
          className={styles.buttonImg}
        >
          <i class="fa fa-book" aria-hidden="true"></i>
          <span style={{ marginLeft: 3 }}>Pinjamanku</span>
        </Button>
      </div>
      <div className="container" style={{ marginTop: -12 }}>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            {props.sort == undefined ? (
              <i
                onClick={handleSort("DESC")}
                class="fa fa-sort-amount-asc"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                class="fa fa-sort-amount-desc"
                onClick={handleSort("ASC")}
                aria-hidden="true"
              ></i>
            )}
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavGenre} />
          <Collapse isOpen={isOpenNavGenre} navbar>
            <Nav className={styles.navGenre} className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={handleCategory("All")}
                >
                  All
                </NavLink>
              </NavItem>
              {props.AllGenre.data.map((genre) => {
                return (
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      onClick={handleCategory(genre.name_genre)}
                    >
                      {genre.name_genre}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
            <NavbarText >
               <InputGroup className={styles.searchInput}>
            <FormGroup>
              <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={() => searchBooks()} placeholder="Search..." />
              </FormGroup>
              <div style={{width:12}}></div>
                  <Button onClick={toggle} style={{ backgroundColor: "white", height: 39 }}>
                    <i
                      class="fa fa-search"
                      style={{ color: "gray",  }}
                      aria-hidden="true"
                    ></i>
                  </Button>
                </InputGroup>
      
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
      <div className="container" style={{ marginTop: 40 }}>
        <div data-aos="fade-up" style={{ marginBottom: 100 }}>
          <h1 className={styles.textList}>List Buku</h1>
          <p className={styles.textListTitle}>
            Ada banyak buku yang bisa kamu pinjam
          </p>
        </div>
        <Row>
          {dataBooks.map((allBooks) => {
            return (
              <Col md="2" xs="6">
                <Card
                  data-aos="fade-up"
                  style={{ width: 180, height: 500, marginTop: 20 }}
                  className={styles.card}
                >
                  <CardImg
                    top
                    width="100%"
                    style={{ height: 300 }}
                    src={`${process.env.REACT_APP_URL}${allBooks.image}`}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle style={{ fontWeight: "bold" }}>
                      {allBooks.title.substr(0, 11)}
                    </CardTitle>
                    <CardSubtitle style={{ fontSize: 15, color: "gray" }}>
                      Rak: {allBooks.rak}
                    </CardSubtitle>
                    <CardSubtitle
                      style={{
                        fontSize: 15,
                        color: "gray",
                        marginTop: 1,
                        height: 50,
                      }}
                    >
                      Author: {allBooks.name_author}
                    </CardSubtitle>

                    {allBooks.id_genre == "18" ? (
                      <>
                        <Button
                          onClick={() =>
                            window.location.replace(
                              `${process.env.REACT_APP_URL}${allBooks.pdf_name}`
                            )
                          }
                          style={{
                            marginTop: 20,
                            width: "100%",
                            backgroundColor: "white",
                            borderWidth: 2,
                            borderColor: "black",
                            color: "black",
                          }}
                        >
                          Baca Online
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() =>
                            history.push(`/DetailBooks/${allBooks.id}`)
                          }
                          style={{
                            marginTop: 20,
                            width: "100%",
                            backgroundColor: "white",
                            borderWidth: 2,
                            borderColor: "black",
                            color: "black",
                          }}
                        >
                          Detail
                        </Button>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  AllGenre: state.genreGet,
  auth: state.auth,
  logout: state.logout,
});
const mapDispatchToProp = { genreGet, login, logout };

export default connect(mapStateToProps, mapDispatchToProp)(HomePage);
