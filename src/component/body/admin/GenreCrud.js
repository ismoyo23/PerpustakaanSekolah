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
import {
  genreGet,
  actionGenre,
  deleteGenre,
  showGenre,
} from "../../../redux/actions/genre";
import { connect } from "react-redux";
function GenreCrud(props) {
  const { buttonLabel, className } = props;

  //=======================================================================================
  // component did mount
  useEffect(() => {
    GetAllGenre();
  }, []);



  //=======================================================================================
  // State
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let [nameGenre, setNameGenre] = useState("");
  let [id, setId] = useState();
  let [modalTitle, setModalTitle] = useState("Add Genre");
  let [search, setSearch] = useState("");

  //=======================================================================================
  // process add and update data
  let ActionGenre = (event) => {
    event.preventDefault();
    let data = {
      // ========================================//
      // url and method
      ConUrl:
        modalTitle == "Add Genre"
          ? `${process.env.REACT_APP_URL}books/genre`
          : `${process.env.REACT_APP_URL}books/genre/${id}`,
      Method: modalTitle == "Add Genre" ? `POST` : `PUT`,
      // =======================================//
      // Call value from state
      name_genre: nameGenre,
    };

    props.actionGenre(data).then(() => {
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
  let GetAllGenre = () => {
    let data = {
      Search: search == "" ? "" : `/?field=name_genre&search=${search}`,
      ConUrl: process.env.REACT_APP_URL,
    };
    props.genreGet(data);
  };

  //=======================================================================================
  // process show data genre by id
  let ShowGenre = (id) => (event) => {
    event.preventDefault();
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      id: id,
    };
    props
      .showGenre(data)
      .then((props) => {
        let data = props.action.payload.data.data[0];
        setId(id);
        setModal(true);
        setNameGenre(data.name_genre);
        setModalTitle("Edit Genre");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //=======================================================================================
  // process delete data
  let DeleteGenre = (id) => (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
        props.deleteGenre(data).then(() => {
          Swal.fire({
            title: "Success",
            text: "Delete Data Sucess",
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
  };
  return (
    <>
      {/* ======================================================= */}
      {/* modal from add and update data*/}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={ActionGenre}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name Genre</Label>
                <Input
                  value={nameGenre}
                  onChange={(e) => setNameGenre(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Title Books"
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
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
              <Col md="6">
                <Button onClick={toggle} color="primary">
                  <i class="fa fa-plus" aria-hidden="true"></i> Add Genre
                </Button>
              </Col>

              <Col md="4">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={style.Search}
                  type="text"
                  placeholder="Search"
                  
                />
              </Col>
            
           
              <Button style={{marginTop: -2,height: 40 }} onClick={() => GetAllGenre()} color="link"><i class="fa fa-search" aria-hidden="true"></i></Button>
            </Row>
            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name Genre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.crudGenre.data.map((genre, key) => {
                  return (
                    <tr>
                      <td scope="row">{key + 1}</td>
                      <td>{genre.name_genre}</td>
                      <td>
                        <Button
                          onClick={ShowGenre(genre.id_genre)}
                          color="primary"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </Button>
                        <Button
                        style={{marginLeft: 9}}
                          onClick={DeleteGenre(genre.id_genre)}
                          color="danger"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
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

const mapStateToProps = (state) => ({
  crudGenre: state.genreGet,
  showData: state.showGenre,
});
const mapDispatchToProp = { genreGet, actionGenre, deleteGenre, showGenre };

export default connect(mapStateToProps, mapDispatchToProp)(GenreCrud);
