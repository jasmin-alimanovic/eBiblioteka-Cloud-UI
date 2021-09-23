import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Error403() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "200px" }}
        >
          <h1
            style={{
              fontSize: "3rem",
              alignSelf: "center",
              justifySelf: "center",
              color: "red",
            }}
          >
            ERROR 403
          </h1>
          <h1>Niste autorizovani za pristup ovoj stranici</h1>
        </div>
        <div className="w-100 mt-5 d-flex justify-content-center">
          <Button style={{ margin: "auto" }}>
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
