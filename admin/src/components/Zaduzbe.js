import React, { useRef, useState, useEffect } from "react";
import { Form, Image, Dropdown, Button } from "react-bootstrap";

//local imports
import searchIcon from "../assets/img/search.svg";
// import addIcon from "../assets/img/add.svg";
import sortIcon from "../assets/img/sort.svg";
import MenuComponent from "./Menu";
import { useAuth } from "../contexts/AuthContext";
import leftArrow from "../assets/img/left-arrow.svg";
import rightArrow from "../assets/img/right-arrow.svg";
// import moreIcon from "../assets/img/more.svg";
import upIcon from "../assets/img/sort-up.svg";
import downIcon from "../assets/img/sort-down.svg";
import { getZaduzbe, updateZaduzba } from "../services/zaduzbaService";
import { updateBook } from "../services/bookService";
import Swal from "sweetalert2";

//
export default function Zaduzbe() {
  const { currentUser } = useAuth();
  const [activeSort, setActiveSort] = useState(1);
  const [zaduzbe, setZaduzbe] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("id_desc");
  const [isUpdated, setIsUpdated] = useState(false);

  const searchRef = useRef("");

  //function that handles submit of search field
  function handleSubmit() {
    setQuery(searchRef.current.value);
  }
  async function VratiZaduzbu(e, zaduzba, book) {
    e.preventDefault();

    await updateZaduzba(zaduzba.id, { isZavrsena: true });
    zaduzba.isZavrsena = true;
    setIsUpdated((state) => !state);
    const _book = {
      ...book,
      dostupno: book.dostupno + 1,
      kategorijaId: book.kategorija.id,
      izdavacId: book.izdavac.id,
      jezikId: book.jezik.id,
      autorId: book.autor.id,
    };
    await updateBook(book.id, _book);
    getZaduzbe(sort, query, page, pageSize).then((data) => {
      setZaduzbe(data);
    });
  }

  function detaljiZaduzbe(zaduzba) {
    Swal.fire(
      `Zaduzba br. ${zaduzba.id}`,
      `<ul style="list-style:none; " className="klasa" align=left>
        <li><strong>Šifra:</strong> ${zaduzba.id}</li>
        <li><strong>Knjiga:</strong> ${zaduzba.knjiga.naziv}</li>
        <li><strong>Korisnik:</strong> ${zaduzba.korisnik.ime} ${
        zaduzba.korisnik.prezime
      }</li>
        <li><strong>Datum zaduživanja:</strong> ${new Date(
          zaduzba.datumZaduzbe
        ).toLocaleDateString()}</li>
        <li><strong>Datum vraćanja:</strong> ${new Date(
          zaduzba.datumVracanja
        ).toLocaleDateString()}</li>
      
      </ul>`,
      "info"
    ).then((res) => {});
  }

  useEffect(() => {
    document.title = "eBiblioteka Cloud-Zadužbe";
  }, []);
  useEffect(() => {
    getZaduzbe(sort, query, page, pageSize).then((data) => {
      setZaduzbe(data);
    });
  }, [page, pageSize, query, sort, isUpdated]);
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick, dots }, ref) => (
    <span
      href="/"
      style={{ cursor: "pointer" }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {!dots && <span style={{ color: "black" }}>&#x25bc;</span>}
    </span>
  ));

  return (
    <div className="d-flex">
      <MenuComponent />
      <div className="push"></div>
      <main role="main" id="main" className="w-100">
        <section
          className="my-5 ms-2 d-flex justify-content-between"
          style={{ marginBottom: "1rem !important" }}
        >
          <h1>
            <strong>Zadužbe</strong>
          </h1>
          <div className="user-detail d-flex">
            <span>
              | {currentUser?.ime}&nbsp; {currentUser?.prezime}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              <figure>
                <Image
                  height="30"
                  src={`https://eu.ui-avatars.com/api/?bold=true&name=${currentUser.ime}+${currentUser.prezime}&rounded=true&background=0af`}
                  alt=""
                />
              </figure>
            </span>
          </div>
        </section>
        <div id="books" className="ms-1">
          <section id="search-section w-100">
            <Image
              style={{
                position: "relative",
                top: "30px",
                left: "10px",
              }}
              src={searchIcon}
              alt="search icon"
            />{" "}
            <Form.Control
              className="ps-5 search-input"
              onChange={handleSubmit}
              type="search"
              placeholder="Pretraži korisniku, knjizi ili ID-u"
              ref={searchRef}
            />
          </section>
          <section
            id="books-pagination"
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <section
              id="books-header"
              className="d-flex mt-4 justify-content-between w-100"
            >
              <h3
                style={{
                  // marginLeft: "2rem",
                  marginTop: "1rem",
                  marginBottom: "0rem",
                }}
              >
                <strong>Sve zadužbe</strong>
              </h3>
              <div className="d-flex align-items-center">
                <Dropdown
                  className="mt-2"
                  style={{ height: "20px", textAlign: "end" }}
                >
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    <Image src={sortIcon} alt="sort icon" />
                    &nbsp; Sortiraj
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={activeSort === 1}
                      onClick={() => {
                        setActiveSort(1);
                        setSort("id_desc");
                      }}
                      eventKey="1"
                    >
                      <span>Najnovije postavljeno</span>
                      <img height="30" width="30" alt="" src={downIcon} />
                    </Dropdown.Item>

                    <Dropdown.Item
                      active={activeSort === 6}
                      onClick={() => {
                        setActiveSort(6);
                        setSort("status_desc");
                      }}
                      eventKey="4"
                    >
                      Status <img alt="" src={downIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 3}
                      onClick={() => {
                        setActiveSort(3);
                        setSort("datum_desc");
                      }}
                      eventKey="2"
                    >
                      Datum zaduživanja <img alt="" src={downIcon} />
                    </Dropdown.Item>

                    <Dropdown.Item
                      active={activeSort === 2}
                      onClick={() => {
                        setActiveSort(2);
                        setSort("datum");
                      }}
                      eventKey="2"
                    >
                      Datum zaduživanja <img alt="" src={upIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 7}
                      onClick={() => {
                        setActiveSort(7);
                        setSort("status");
                      }}
                      eventKey="5"
                    >
                      Status <img alt="" src={upIcon} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </section>
            <table className="book-table mt-5 justify-self-center">
              <thead
                style={{
                  borderBottom: "2px solid #0004",
                }}
              >
                <tr className="m-5 book-row">
                  <th style={{ width: "150px" }} className="p-2">
                    Šifra
                  </th>
                  <th style={{ width: "150px" }} className="p-2">
                    Status
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Korisnik
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Knjiga
                  </th>
                  <th style={{ width: "150px" }} className="ps-2">
                    Datum zaduzivanja
                  </th>
                  <th style={{ width: "100px" }} className="ps-2"></th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "13px",
                  fontFamily: "Roboto",
                  color: "#0000008A",
                }}
              >
                {zaduzbe !== null && zaduzbe.data.length > 0 ? (
                  zaduzbe.data.map((zaduzba) => (
                    <tr className="book-row" key={zaduzba.id}>
                      <td className="p-2">
                        <div
                          className="p-1 w-100 h-100 d-flex align-items-center"
                          style={{ textAlign: "center", paddingRight: "3rem" }}
                        >
                          <span title={zaduzba.id}>{zaduzba.id}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        {zaduzba.isZavrsena ? "Vraćena" : "Nije vraćena"}
                      </td>

                      <td className="p-2">
                        <span
                          title={
                            zaduzba.korisnik.ime +
                            " " +
                            zaduzba.korisnik.prezime
                          }
                        >
                          {zaduzba.korisnik.ime +
                            " " +
                            zaduzba.korisnik.prezime}
                        </span>
                      </td>
                      <td className="p-2">{zaduzba.knjiga.naziv}</td>
                      <td className="p-2">
                        <span
                          title={new Date(
                            zaduzba.datumZaduzbe
                          ).toLocaleDateString()}
                        >
                          {new Date(zaduzba.datumZaduzbe).toLocaleDateString()}
                        </span>
                      </td>
                      <td align="center" className="p-2">
                        {!zaduzba.isZavrsena ? (
                          <Button
                            onClick={(e) => {
                              VratiZaduzbu(e, zaduzba, zaduzba.knjiga);
                              zaduzba.isZavrsena = true;
                            }}
                            variant="warning"
                          >
                            Vrati
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              detaljiZaduzbe(zaduzba);
                            }}
                          >
                            Pogledaj
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Trenutno nema korisnika</td>
                  </tr>
                )}
              </tbody>
            </table>
            <section
              style={{
                borderTop: "1px solid #0004",
                borderBottom: "1px solid #0004",
                padding: "1rem",
                width: "100%",
              }}
              className="d-flex justify-content-end"
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#9FA2B4",
                  display: "flex",
                  alignItems: "center",
                }}
                className="me-5"
              >
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    Rows per page &nbsp;
                    <span style={{ color: "black", fontSize: "16px" }}>
                      {pageSize}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setPageSize(5);
                      }}
                      eventKey="1"
                    >
                      5
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setPageSize(10);
                      }}
                      eventKey="2"
                    >
                      10
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setPageSize(15);
                      }}
                      eventKey="3"
                    >
                      15
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="p-0 d-flex align-items-center">
                <span className="me-3">
                  {pageSize * (page - 1) + 1}-
                  {pageSize * page < zaduzbe?.count
                    ? pageSize * page
                    : zaduzbe?.count}{" "}
                  od {zaduzbe?.count} &nbsp;&nbsp;{" "}
                </span>
                <Button
                  variant="light"
                  className="p-0"
                  disabled={zaduzbe?.previous ? false : true}
                  onClick={() => {
                    setPage((page) => page - 1);
                  }}
                >
                  <img src={leftArrow} alt="" />
                </Button>{" "}
                <Button
                  disabled={zaduzbe?.next ? false : true}
                  onClick={() => {
                    setPage((page) => page + 1);
                  }}
                  className="p-0"
                  variant="light"
                >
                  {" "}
                  <img src={rightArrow} alt="" />
                </Button>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}
