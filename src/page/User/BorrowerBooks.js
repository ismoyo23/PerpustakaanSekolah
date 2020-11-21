import React, { useEffect, useState } from "react";
import Navbar from "../../component/theme/users/NavbarPage";
import BorrowedComponent from "../../component/body/users/BorrowerComponent";
import DataNotFound from "../../component/body/users/DataNotFound";
import axios from "axios";
import { Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { login, logout } from "../../redux/actions/auth";
function BorrowerBooks(props) {
  let [Borrowed, setBorrowed] = useState([]);
  useEffect(() => {
    getNameBorrowed();
  }, []);

  let getNameBorrowed = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}books/borrower?field=users.id_user&search=${props.auth.data.id_user}`,
    })
      .then((response) => {
        console.log(response);
        setBorrowed(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {props.auth.data.id_user == undefined ? (
        <DataNotFound />
      ) : (
        <div>
          <Navbar />
          <Container>
            <Row>
              {Borrowed.map((borrow) => {
                return <BorrowedComponent borrow={borrow} />;
              })}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProp = { login, logout };

export default connect(mapStateToProps, mapDispatchToProp)(BorrowerBooks);
