import React, { useRef } from "react";
import { Form, Image } from "react-bootstrap";
import searchIcon from "../../assets/img/search.svg";

export default function CustomHeader({ currentUser, setQuery }) {
  const searchRef = useRef();

  //function that handles submit of search field
  function handleSubmit() {
    setQuery(searchRef.current.value);
  }
  return (
    <div className="header d-flex justify-content-between">
      <div className="header-left" style={{ margin: "auto" }}>
        <h3>
          <strong> Biblioteka Cloud</strong>
        </h3>
      </div>
      <div
        className="header-middle d-flex align-items-center"
        style={{ margin: "auto", width: "50%" }}
      >
        <Image
          style={{
            position: "relative",
            top: "0px",
            left: "30px",
          }}
          src={searchIcon}
          alt="search icon"
        />{" "}
        <Form.Control
          className="ps-5 search-input"
          onChange={handleSubmit}
          type="search"
          placeholder="Pretraži knjige"
          ref={searchRef}
        />
      </div>
      <div className="header-right" style={{ margin: "auto" }}>
        <h5>
          <strong>Dobrodošli</strong>
        </h5>

        <small>
          {currentUser.ime} {currentUser.prezime}
        </small>
      </div>
    </div>
  );
}
