import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

function NevbarComponent({ title, breadcrumbPath, userDetailsProps }) {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item d-none d-sm-inline-block">
          <Link to={"/"} className="nav-link">
            Home /{" "}
          </Link>
        </li>
        {breadcrumbPath?.length &&
          breadcrumbPath.map((path) => (
            <li className="nav-item" key={path.link}>
              <Link
                to={"/" + path.link}
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                {path.value} /
              </Link>
            </li>
          ))}
        <li
          className="nav-link"
          data-widget="pushmenu"
          href="#"
          role="button"
        ></li>
      </ul>

      <ul className="navbar-nav ml-auto mr-5">
        <li className="h5">{userDetailsProps?.name}</li>
      </ul>
    </nav>
  );
}

const mapStatetoProps = (state) => {
  return {
    userDetailsProps: state?.loginUserReducer?.userDetails,
  };
};

export default connect(mapStatetoProps)(NevbarComponent);
