import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swiper from "react-id-swiper";
import {
  Input,
  Table,
  Container,
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";
import style from "../../../styles/Admin/Body.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  authorGet,
  addData,
  removeData,
  showID,
} from "../../../redux/actions/author";
import { connect } from "react-redux";
function AuthorCrud(props) {
  console.log(props);

  const { buttonLabel, className } = props;

  // =============================================================================
  // Use effect => Component did mount hooks version
  // process get All
  useEffect(() => {
    getAuthor()
  }, []);


  let getAuthor = () => {
    let data = {
        Search: search === "" ? '' : `?field=name_author&search=${search}`,
        ConUrl: process.env.REACT_APP_URL
    } 
    props.authorGet(data);
  }

  // =============================================================================
  // state
  let [modal, setModal] = useState(false);
  let toggle = () => setModal(!modal);
  let [nameAuthor, setNameAuthor] = useState("");
  let [id, setId] = useState();
  let [modalTitle, setModalTitle] = useState("Add Author");
  let [profileAuthor, setProfileAuthor] = useState("");
  let [search, setSearch] = useState("");

  // =============================================================================
  // function for delete data
  let DeleteAuthor = (id) => (event) => {
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
        // =================//
        // axios delete data to api
        props
          .removeData(data)
          .then(() => {
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
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // =============================================================================
  // funtion for handle action author and update author

  let ActionAuthor = (event) => {
    event.preventDefault();
    let data = {
      // ===========================//
      // set url and method for add and udapte data
      ConUrl:
        modalTitle == "Add Author"
          ? `${process.env.REACT_APP_URL}books/author`
          : `${process.env.REACT_APP_URL}books/author/${id}`,
      Method: modalTitle == "Add Author" ? "POST" : "PUT",

      // ===========================//
      // Call value from state
      name_author: nameAuthor,
      profile_author: profileAuthor,
    };
    props.addData(data).then(() => {
      Swal.fire({
        title: "Success",
        text: "Add Data Sucess",
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

  // =============================================================================
  // funtion for handle show author by ID

  let showAuthor = (id) => (event) => {
    event.preventDefault();
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      id: id,
    };
    props.showID(data).then((props) => {
      let data = props.action.payload.data.data[0];
      setModal(true);
      setNameAuthor(data.name_author);
      setProfileAuthor(data.profile_author);
      setModalTitle("Edit Author");
      setId(id);
    });
  };

  // =============================================================================
  // funtion for set state to default

  let close = () => {
    setModal(false);
    setNameAuthor("");
    setModalTitle("Add Author");
  };

  return (
    <>
      {/* ==================================================================================== */}
      {/* modal for process action Add Data and Update Data */}

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={ActionAuthor}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name Author</Label>
                <Input
                  onChange={(e) => setNameAuthor(e.target.value)}
                  value={nameAuthor}
                  type="text"
                  id="exampleEmail"
                  placeholder="Name Author"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleText">Profile Author</Label>
                <Input
                  onChange={(e) => setProfileAuthor(e.target.value)}
                  value={profileAuthor}
                  type="textarea"
                  name="text"
                  id="exampleText"
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary">{modalTitle}</Button>
            <Button color="secondary" onClick={close}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* ===================================================================================== */}
      {/* Table */}

      <Row noGutters>
        <Col md="12" xs="12">
          <Card body className={style.CardTable}>
            <Row>
              <Col md="6">
                <Button onClick={toggle} color="primary">
                  <i class="fa fa-plus" aria-hidden="true"></i> Add Author
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
            
           
              <Button style={{marginTop: -2,height: 40 }} onClick={() => getAuthor()} color="link"><i class="fa fa-search" aria-hidden="true"></i></Button>
            </Row>
            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.crudState.data.map((author, key) => {
                  return (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{author.name_author}</td>
                      <td>
                        <Button
                        style={{marginLeft: 8}}
                          onClick={showAuthor(author.id_author)}
                          color="primary"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </Button>
                        <Button
                          style={{marginLeft: 8}}
                          onClick={DeleteAuthor(author.id_author)}
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
  crudState: state.authorGet,
  showData: state.showID,
});
const mapDispatchToProp = { authorGet, addData, removeData, showID };

export default connect(mapStateToProps, mapDispatchToProp)(AuthorCrud);
