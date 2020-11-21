import React, { useEffect, useState } from "react";
import { PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom";

function PaginationPage(props) {
  let history = useHistory();
  let handlePagination = (page) => (event) => {
    event.preventDefault();
    if (page > 1) {
      history.push(`/page/${page}`);
      window.location.reload();
    } else {
      history.push(`/`);
      window.location.reload();
    }
  };
  return (
    <>
      <PaginationItem>
        <PaginationLink onClick={handlePagination(props.data)}>
          {props.data}
        </PaginationLink>
      </PaginationItem>
    </>
  );
}

export default PaginationPage;
