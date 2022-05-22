import React from "react";
import { Link } from "react-router-dom";

function DynamicError(props) {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ width: "100vw", height: "calc(100vh - var(--site-nav-height))" }}
    >
      <div style={{ fontSize: "10rem", fontWeight: "bolder" }}>
        {props.error === undefined ? "500" : `${props.error}`}
      </div>
      <div>
        Oh no, we've had a problem fulfilling your request. Please try again
        later or click <Link to="/">here</Link> to go back home.
      </div>
    </div>
  );
}

export default DynamicError;
