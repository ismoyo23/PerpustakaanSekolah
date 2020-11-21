import React, { useState } from "react";
import style from "../../../styles/Admin/Body.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Row, Col, Card, FormGroup,Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import ReactToPdf from "react-to-pdf";
const ref = React.createRef();

function CatalogComponent(props) {
    const {
        buttonLabel,
        className
      } = props;

    let [print1, setPrint1] = useState('')
    let [print2, setPrint2] = useState('')
    let [print3, setPrint3] = useState('')
    let [print4, setPrint4] = useState('')
    let [print5, setPrint5] = useState('')
    let [print6, setPrint6] = useState('')

    let [catalog1, setCatalog1] = useState('')
    let [catalog2, setCatalog2] = useState('')
    let [catalog3, setCatalog3] = useState('')

      
    //   modal catalog
      const [modalCatalog, setModalCatalog] = useState(false);
      const toggleCatalog = () => setModalCatalog(!modalCatalog);

    // modal no panggil
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);

        let [resultCatalog, setResultCatalog] = useState([])
        let [resultPrint, setResultPrint]= useState([])
      

    let getCatalog = (event) => {
        event.preventDefault()

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}books?catalog1=${catalog1}&catalog2=${catalog2}&catalog3=${catalog3}`
        }).then((response) => {
            setResultCatalog(response.data.data)
            setModalCatalog(!modalCatalog)
        })
    } 

    let getPrint = (event) => {
        event.preventDefault()

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}books?antrian1=${print1}&antrian2=${print2}&antrian3=${print3}&antrian4=${print4}&antrian5=${print5}&antrian6=${print6}`
        }).then((response) => {
            setResultPrint(response.data.data)
            setModal(!modal)
        })
    }

    const options = {
        orientation: 'portrait',
        unit: 'in',
        format: [900, 388]
    };
 
  return (
    <>
    {/* modal Catalog */}
    <Modal isOpen={modalCatalog} toggle={toggleCatalog} className={className}>
    <div  ref={ref}>
        <ModalHeader toggle={toggleCatalog}>Print Catalog</ModalHeader>
        <ModalBody>
       
        {resultCatalog.map((resultData) => {
            return(
           
                
                
                    <Card style={{height: 400, width: 472, marginTop: 16}}>
                        <Container style={{marginTop: 12}}>
                    <Row>
                        <Col md='1'>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.no_call1}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.no_call2}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.no_call3}</p>
                        </Col>
                        <Col style={{marginTop: 13}} md='10'>
                            <p style={{fontWeight: 'bold'}}>{resultData.name_author}</p>
                            <div style={{width: 272, height: 70}}>
                            <p style={{color: 'grey', marginTop: -14,}}>{resultData.title}, {resultData.name_author}, Oleh {resultData.author2}, {resultData.edition}, {resultData.publisher}</p>
                            </div>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.collation}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.note}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.Iindex}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.ISBN}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.TraceContents}</p>
                            <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.number_investaris}</p>
                            <Row>
                                <Col md='6'>
                                    <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.info_1}</p>
                                   
                                </Col>
                                <Col md='6'>
                                    
                                    <p style={{color: 'grey', marginTop: -14, width: 472}}>{resultData.info_2}</p>
                                </Col>
                            </Row>
                        </Col>
                        </Row>
                        </Container>
                    </Card>
              
    
            )
        })}
        </ModalBody>
        </div>
        <ModalFooter>
        <ReactToPdf targetRef={ref} options={options}  filename="Catalog.pdf">
        {({toPdf}) => (
            <Button color="primary" onClick={toPdf}>Print</Button>
        )}
    </ReactToPdf>
          
          <Button color="secondary" onClick={toggleCatalog}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* modal no panggil */}
      <Modal isOpen={modal} toggle={toggle} className={className}>
      <div  ref={ref}>
        <ModalHeader toggle={toggle}>Print No Panggil</ModalHeader>
        <ModalBody>
            <Row>
            {resultPrint.map((resultData) => {
            return(
                <Col md='6'>
                    <Card style={{height: 113, width: 188, marginTop: 16}}>
                        <Container style={{marginTop: 12}}>
                            <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 11}}>Perpustakaan Sasana Pustaka</p>
                            <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 11, marginTop: -18}}>SMKN 2 Trenggalek</p>
                            <hr style={{marginTop: -13, borderColor: 'black'}}/>
                                <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 11, marginTop: -11}}>{resultData.no_call1}</p>
                            <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 11, marginTop: -11}}>{resultData.no_call2}</p>
                            <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 11, marginTop: -11}}>{resultData.no_call3}</p>
                        </Container>
                    </Card>
                </Col>
            )
            })}
            </Row>
        </ModalBody>
        </div>
        <ModalFooter>
        <ReactToPdf targetRef={ref} options={options}  filename="Antrian.pdf">
        {({toPdf}) => (
            <Button color="primary" onClick={toPdf}>Print</Button>
        )}
    </ReactToPdf>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Row noGutters>
        <Col md="12" xs="12">
          <Card body className={style.CardTable}>
            <Row>
              <Col md="5">
                <p style={{ marginLeft: -1, fontWeight: "bold", fontSize: 20 }}>
                  Print Catalog
                </p>
              </Col>
              <Col md="3">
                <p style={{ marginLeft: -1, fontWeight: "bold", fontSize: 20 }}>
                  No Panggil
                </p>
              </Col>
            </Row>

            <Row>
                <Col md='5'>
                    <div style={{width: 180}}>
                        <FormGroup>
                            <Input value={catalog1} onChange={(e) => setCatalog1(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <FormGroup>
                            <Input value={catalog2} onChange={(e) => setCatalog2(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <FormGroup>
                            <Input value={catalog3} onChange={(e) => setCatalog3(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <Button color="primary" onClick={getCatalog}>Proses</Button>
                    </div>

                       
                </Col>
                <Col md='3'>
                <div style={{width: 180}}>
                        <FormGroup>
                            <Input value={print1} onChange={(e) => setPrint1(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <FormGroup>
                            <Input value={print2} onChange={(e) => setPrint2(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <FormGroup>
                            <Input value={print3} onChange={(e) => setPrint3(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <Button color="primary" onClick={getPrint}>Proses</Button>
                    </div>
                </Col>

                <Col md='3'>
                <div style={{width: 180}}>
                        <FormGroup>
                            <Input value={print4} onChange={(e) => setPrint4(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <FormGroup>
                            <Input value={print5} onChange={(e) => setPrint5(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        <FormGroup>
                            <Input value={print6} onChange={(e) => setPrint6(e.target.value)} name="email" id="exampleEmail" placeholder="Kode Buku" />
                        </FormGroup>

                        
                    </div>
                </Col>
            </Row>
            
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CatalogComponent;
