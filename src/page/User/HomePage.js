import React, { useState, useEffect } from "react";
import Navbar from "../../component/theme/users/NavbarPage/index.js";
import HomePage from "../../component/body/users/HomeComponent";


import FooterComponent from "../../component/body/users/FooterComponent";
function HomeUsers(props) {

  return (
    <>
      {/* =============================================================== */}
      {/* Navbar Component */}
      <Navbar sort={props.match.params.sort} />

      {/* =============================================================== */}
      {/* List Books */}
      <HomePage
        searchData={props.match.params.name}
        category={props.match.params.category}
        sort={props.match.params.sort}
      />
      <FooterComponent />
    </>
  );
}

export default HomeUsers;
