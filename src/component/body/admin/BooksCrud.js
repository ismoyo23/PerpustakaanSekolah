import React, { useState, useEffect } from "react";
import style from "../../../styles/Admin/Body.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Barcode from "react-barcode";
import ReactToPdf from "react-to-pdf";
import axios from "axios";

import {
  Container,
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

import FormData from "form-data";
// ====================================================================================
// import action redux
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";
import {
  booksGet,
  addData,
  deleteBooks,
  showBooks,
} from "../../../redux/actions/books";
import { authorGet } from "../../../redux/actions/author";
import { genreGet } from "../../../redux/actions/genre";
function BooksCrud(props) {
  const ref = React.createRef();
  useEffect(() => {
    getAllAuthor();
    getAllGenre();
    getAllBooks();
  }, []);



  //==============================================================================
  // state
  let [id, setId] = useState("");
  let [title, setTitle] = useState("");
  let [discription, setDiscrption] = useState("");
  let [images, setImage] = useState("");
  let [idGenre, setIdGenre] = useState("");
  let [idAuthor, setIdAuthor] = useState("");
  let [rak, setRak] = useState("");
  let [stok, setStok] = useState("");
  let [Action, setAction] = useState("");
  let [ISBN, setISBN] = useState('')
  let [classification, setClassification] =useState('')
  let [edition, setEdition] =useState('')
  let [TraceContents, setTraceContents] =useState('')
  let [placePublication, setPlacePublication] = useState('')
  let [DiscriptionBook, setDiscriptionBook] =useState('')
  let [year, setYear] = useState('')
  let [bibiografi, setBibiografi] = useState('nill')
  let [publisher, setPublisher] = useState('')
  let [noPanggil1, setNoPanggil1] = useState('')
  let [noPanggil2, setNoPanggil2] = useState('')
  let [noPanggil3, setNoPanggil3] = useState('')
  let [modalTitle, setModalTitle] = useState("Add Books");
  let [search, setSearch] = useState("");
  let [modal, setModal] = useState(false);
  let toggle = () => setModal(!modal);
  let [modalExcel, setModalExcel] = useState(false);
  let [excel, setExcel] = useState("");
  let [pdf, setPdf] = useState("");
  let [index, setIndex] = useState("");
  let [collation, setCollation] = useState("");
  let [note, setNote] = useState("");
  let [author2, setAuthor2] = useState("");
  let [info1, setInfo1] = useState("");
  let [info2, setInfo2] = useState("");
  let [numberInvestaris, setNumberInvestaris] = useState("")
  const [modalPrintBook, setModalPrintBook] = useState(false);
  const toggleExcel = () => setModalExcel(!modalExcel);
  const togglePrintBook = () => setModalPrintBook(!modalPrintBook);
  const [modalPrint, setModalPrint] = useState(false);

  const togglePrint = () => setModal(!modalPrint);
  // ==============================================================================
  // get data All Books
  let getAllBooks = () => {
    let data = {
      SearchBooks: search === "" ? "" : `?search=${search}&field=title`,
      ConUrl: process.env.REACT_APP_URL,
    };
    props.booksGet(data);
  };

  // ==============================================================================
  // get data All Author from combobox
  let getAllAuthor = () => {
    let data = {
      Search: "",
      ConUrl: process.env.REACT_APP_URL
  } 
  props.authorGet(data);
  };

  // ==============================================================================
  // get data All Author for combobox

  let getAllGenre = () => {
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      Search: "",
    };
    props.genreGet(data);
  };

  // ==============================================================================
  // Action Delete Books by id
  let DeleteBooks = (id) => (event) => {
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
        props
          .deleteBooks(data)
          .then(() => {
            Swal.fire({
              title: "Success",
              text: `Delete success`,
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
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

  // ==============================================================================
  // Show Books by Id
  let ShowBooks = (id) => (event) => {
    event.preventDefault();
    let data = {
      ConUrl: process.env.REACT_APP_URL,
      id: id,
    };
    props
      .showBooks(data)
      .then((props) => {
        let data = props.action.payload.data.data[0];
        setModalTitle('Edit Books')
        setAction("Edit Books")
        setModal(true);
        setId(id);
        setTitle(data.title);
        setDiscrption(data.discription);
        setIdAuthor(data.id_author);
        setStok(data.stok);
        setRak(data.rak);
        setIdGenre(data.id_genre);
        setISBN(data.ISBN);
        setPlacePublication(data.placePublication);
        setTraceContents(data.TraceContents);
        setEdition(data.edition);
        setDiscriptionBook(data.DiscriptionBook)
        setPublisher(data.publisher)
        setYear(data.year)
        setBibiografi(data.bibiografi)
        setClassification(data.classification)
        setNote(data.note)
        setNumberInvestaris(data.number_investaris)
        setCollation(data.collation)
        setAuthor2(data.author2)
        setIndex(data.Iindex)
        setCollation(data.collation)
        setNoPanggil1(data.no_call1)
        setNoPanggil2(data.no_call2)
        setNoPanggil3(data.no_call3)
        setInfo1(data.info_1)
        setInfo2(data.info2)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ==============================================================================
  // Action Add Books
  let ActionBooks = (event) => {
    event.preventDefault();
    if (id == "" || title == "" || rak == "" || stok == "" || idGenre == "" || idAuthor == "" || ISBN == "" || classification == "" || edition == "" || TraceContents == "" || DiscriptionBook == "" || placePublication == "" || publisher == "" || year == "" || bibiografi == "" || collation == "" || index == "" || note == "" || author2 == "" || numberInvestaris == "" || noPanggil1 == "" || noPanggil2 == "" || info1 == "" || info2 == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ada form yang kosong, tolong lengkapi form!",
      });
    }else{
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("rak", rak);
      formData.append("pdf_name", pdf);
      formData.append("image", images);
      formData.append("stok", stok);
      formData.append("id_genre", idGenre);
      formData.append("id_author", idAuthor);
      formData.append("isbn", ISBN)
      formData.append("classification", classification)
      formData.append("edition", edition)
      formData.append("TraceContents", TraceContents)
      formData.append("DiscriptionBook", DiscriptionBook)
      formData.append("placePublication", placePublication)
      formData.append("publisher", publisher)
      formData.append("year", year)
      formData.append("bibiografi", bibiografi)
      formData.append("collation", collation)
      formData.append("index", index)
      formData.append("note", note)
      formData.append("author2", author2)
      formData.append("number_investaris", numberInvestaris)
      formData.append("no_call1",noPanggil1)
      formData.append("no_call2", noPanggil2)
      formData.append("no_call3", noPanggil3)
      formData.append("info1", info1)
      formData.append("info2", info2)
  
      // =============================================//
      // set method and url
      let data = {
        ConUrl:
          modalTitle === "Add Books"
            ? `${process.env.REACT_APP_URL}books`
            : `${process.env.REACT_APP_URL}books/${id}`,
        Method: modalTitle === "Add Books" ? `POST` : `PUT`,
      };
      // =============================================//
      // action add data and update data
      props
        .addData(data, formData)
        .then(() => {
          Swal.fire({
            title: "Success",
            text: `${modalTitle} success`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
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
    
  };

  // ==============================================================================
  // function for set state to default
  let CloseModal = () => {
        setModal(false);
        setId("");
        setTitle("");
        setDiscrption("");
        setIdAuthor("");
        setStok("");
        setIdGenre("");
        setRak("");
        setISBN("");
        setPlacePublication('');
        setTraceContents('');
        setEdition('');
        setDiscriptionBook('')
        setPublisher('')
        setYear('')
        setBibiografi('')
        setClassification('')
        setNote('')
        setNumberInvestaris('')
        setCollation('')
        setAuthor2('')
        setIndex('')
        setCollation('')
        setNoPanggil1('')
        setNoPanggil2('')
        setNoPanggil3('')
    setModalTitle("Add Books");
    setAction("AddBooks");
  };

  let handleImport = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excel", excel);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}books/excel`,
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

  const { buttonLabel, className } = props;

  let options = {
    orientation: "landscape",
    unit: "in",
    format: [123, 400],
  };

  let optionsPdfbooks = {
    orientation: "portait",
    unit: "in",
    format: [472,264],
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
      {/* ============================================================================== */}
      {/* modal */}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={ActionBooks}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Kode Buku</Label>
                <Input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Kode Buku"
                />
                <ReactToPdf
                  style={{ width: 100 }}
                  filename={id}
                  options={options}
                >
                  {({ toPdf, targetRef }) => (
                    <>
                      <div ref={targetRef}>
                        <Barcode value={id} />
                      </div>

                      <Button color="primary" onClick={toPdf}>
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                      </Button>
                    </>
                  )}
                </ReactToPdf>
              </FormGroup>

              <FormGroup>
                <Container>
                <Row>
                    <Input value={noPanggil1} onChange={(e) => setNoPanggil1(e.target.value)} style={{width: 110}} placeholder="No Panggil" />
                    <Input value={noPanggil2} onChange={(e) => setNoPanggil2(e.target.value)} style={{width: 60, marginLeft: 12}} name="email"/>
                    <Input value={noPanggil3} onChange={(e) => setNoPanggil3(e.target.value)} style={{width: 60, marginLeft:12}} name="email" />
              
                </Row>
                </Container>
                
              </FormGroup>

              <FormGroup>
                <Label for="exampleSelect">Author</Label>
                <Input
                  value={idAuthor}
                  onChange={(e) => setIdAuthor(e.target.value)}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option value="">
                      Pilih Author
                  </option>
                  {props.authorCrud.data.map((allAuthor) => {
                    return (
                      
                      <option value={allAuthor.id_author}>
                        {allAuthor.name_author}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Title Books"
                />
              </FormGroup>

              

              <FormGroup>
                <Label for="exampleSelect">Genre</Label>
                <Input
                  value={idGenre}
                  onChange={(e) => setIdGenre(e.target.value)}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option value="">
                      Pilih Genre
                  </option>
                  {props.genreCrud.data.map((allGenre) => {
                    return (
                      <option value={allGenre.id_genre}>
                        {allGenre.name_genre}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              {idGenre == "18" ? (
                <FormGroup>
                  <Label for="exampleEmail">Upload PDF</Label>
                  <Input
                    onChange={(e) => setPdf(e.target.files[0])}
                    color="warning"
                    type="file"
                  />
                </FormGroup>
              ) : (
                <></>
              )}

              <FormGroup>
                <Label for="exampleEmail">Upload Image</Label>
                <Input
                  onChange={(e) => setImage(e.target.files[0])}
                  color="warning"
                  type="file"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Rak</Label>
                <Input
                  onChange={(e) => setRak(e.target.value)}
                  value={rak}
                  type="text"
                  id="exampleEmail"
                  placeholder="Rak"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Stok</Label>
                <Input
                  onChange={(e) => setStok(e.target.value)}
                  value={stok}
                  type="text"
                  id="exampleEmail"
                  placeholder="Stok"
                />
              </FormGroup>
              {/* ==================================================== */}
              
              <FormGroup>
                <Label for="exampleText">Diskrpsi buku</Label>
                <Input 
                onChange={(e) => setDiscriptionBook(e.target.value)}
                value={DiscriptionBook}
                id="exampleEmail"
                placeholder="Diskripsi Buku"
                type="textarea" id="exampleText" />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Autor ke dua</Label>
                <Input
                  value={author2}
                  onChange={(e) => setAuthor2(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Author Ke 2"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Edisi Buku</Label>
                <Input
                  onChange={(e) => setEdition(e.target.value)}
                  value={edition}
                  type="text"
                  id="exampleEmail"
                  placeholder="Edisi Buku"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Penerbit</Label>
                <Input
                  onChange={(e) => setPublisher(e.target.value)}
                  value={publisher}
                  type="text"
                  id="exampleEmail"
                  placeholder="Penerbit"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Kolasi</Label>
                <Input
                  value={collation}
                  onChange={(e) => setCollation(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Kolasi"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Catatan</Label>
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Catatan"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Index</Label>
                <Input
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Index"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">ISBN</Label>
                <Input
                  onChange={(e) => setISBN(e.target.value)}
                  value={ISBN}
                  type="text"
                  id="exampleEmail"
                  placeholder="ISBN"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleText">Jejak isinya</Label>
                <Input 
                onChange={(e) => setTraceContents(e.target.value)}
                value={TraceContents}
                id="exampleEmail"
                placeholder="Jejak isinya"
                type="text" id="exampleText" />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Info Tambahan 1</Label>
                <Input
                  onChange={(e) => setClassification(e.target.value)}
                  value={classification}
                  type="text"
                  id="exampleEmail"
                  placeholder="Kualifikasi"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleText">Info tambahan 2</Label>
                <Input 
                onChange={(e) => setPlacePublication(e.target.value)}
                value={placePublication}
                id="exampleEmail"
                placeholder="Tempat rilis"
                type="text" id="exampleText" />
              </FormGroup>
              
              

              <FormGroup>
                <Label for="exampleEmail">Tahun Terbit</Label>
                <Input
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                  type="number"
                  id="exampleEmail"
                  placeholder="Tahun Terbit"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Nomor Investaris</Label>
                <Input
                  value={numberInvestaris}
                  onChange={(e) => setNumberInvestaris(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Nomor Investaris"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Info 1</Label>
                <Input
                  value={info1}
                  onChange={(e) => setInfo1(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Info 1"
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Info 2</Label>
                <Input
                  value={info2}
                  onChange={(e) => setInfo2(e.target.value)}
                  type="text"
                  id="exampleEmail"
                  placeholder="Info 2"
                />
              </FormGroup>

            </Form>
          </ModalBody>

          

          <ModalFooter>
            {modalTitle != "Add Books" ? (
              ""
            ) : (
              <Button color="primary" onClick={toggleExcel}>
                Import Books
              </Button>
            )}

            <Button color="primary">{modalTitle}</Button>
            <Button color="secondary" onClick={CloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* =================================================================== */}
      {/* table */}

      <Row noGutters>
        <Col md="12" xs="12">
          <Card body className={style.CardTable}>
            <Row>
              <Col md="7">
                    <Button onClick={toggle} color="primary">
                      <i class="fa fa-plus" aria-hidden="true"></i> Add Books
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
            
           
              <Button style={{marginTop: -2,height: 40}} onClick={() => getAllBooks()} color="link"><i class="fa fa-search" aria-hidden="true"></i></Button>
           
            </Row>
            <Table hover className={style.Table}>
              <thead>
                <tr>
                  <th>Kode Buku</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Author</th>
                  <th>Rak Books</th>
                  <th>Stok</th>
                  
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {props.booksCrud.data.map((allBooks) => {
                  return (
                    <tr>
                      
                      <td>{allBooks.id}</td>
                      <td>{allBooks.title}</td>
                      <td><img 
                      style={{width: 130, height: 100, borderRadius: 12}}
                        src={`${process.env.REACT_APP_URL}${allBooks.image}`}
                        alt="new"
                        /></td>
                      <td>{allBooks.name_author}</td>
                      <td>{allBooks.rak}</td>
                      <td>{allBooks.stok}</td>
                      <td>
                        <Button
                          onClick={ShowBooks(allBooks.id)}
                          color="primary"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </Button>
                        <Button
                          style={{marginLeft: 8}}
                          onClick={DeleteBooks(allBooks.id)}
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
  auth: state.auth,
  booksCrud: state.booksGet,
  authorCrud: state.authorGet,
  genreCrud: state.genreGet,
});
const mapDispatchToProp = {
  //=================================
  login,
  // ================================
  booksGet,
  addData,
  deleteBooks,
  // ================================
  showBooks,
  // ================================
  authorGet,
  // ================================
  genreGet,
};

export default connect(mapStateToProps, mapDispatchToProp)(BooksCrud);
