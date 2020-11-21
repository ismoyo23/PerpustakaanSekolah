import React from "react";
import styles from "./style.module.css";
import img from "../../../../image/undraw_result_5583.png";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
function DataNotFound() {
  let history = useHistory();
  return (
    <>
      <h1 className={styles.TextOne}>Ooops!!!</h1>
      <p className={styles.TextTwo}>No result</p>
      <div className={styles.button}>
        <Button onClick={() => history.push("/")} color="success">
          Back To Home
        </Button>
      </div>
      <img src={img} className={styles.img} />
    </>
  );
}

export default DataNotFound;
