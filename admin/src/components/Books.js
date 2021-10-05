import React, { useRef, useState, useEffect } from "react";
import { Form, Image, Dropdown, Button } from "react-bootstrap";

//local imports
import searchIcon from "../assets/img/search.svg";
import addIcon from "../assets/img/add.svg";
import sortIcon from "../assets/img/sort.svg";
import AddBookModal from "./modals/AddBookModal";
import { getbooks } from "../services/bookService";
import MenuComponent from "./Menu";
import { useAuth } from "../contexts/AuthContext";
import leftArrow from "../assets/img/left-arrow.svg";
import rightArrow from "../assets/img/right-arrow.svg";
import moreIcon from "../assets/img/more.svg";
import EditBookModal from "./modals/EditBookModal";
import upIcon from "../assets/img/sort-up.svg";
import downIcon from "../assets/img/sort-down.svg";
import IzdajBookModal from "./modals/IzdajBookModal";

//
export default function Books() {
  const { currentUser } = useAuth();
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [activeSort, setActiveSort] = useState(1);
  const [books, setBooks] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("id_desc");
  const [addedBook, setAddedBook] = useState(null);
  const [bookForEdit, setBookForEdit] = useState(null);
  const [izdajKnjigu, setIzdajKnjigu] = useState(null);
  const [modalIzdajShow, setModalIzdajShow] = useState(false);
  const searchRef = useRef("");

  //function that handles submit of search field
  function handleSubmit() {
    setQuery(searchRef.current.value);
  }

  function HiglightTExt(text, highlight) {
    const parts = text?.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts?.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b style={{ color: "yellow" }} key={Math.random() * 500}>
              {part}
            </b>
          ) : (
            part
          )
        )}
      </span>
    );
  }
  useEffect(() => {
    document.title = "eBiblioteka Cloud-Knjige";
  }, []);
  useEffect(() => {
    getbooks(sort, query, page, pageSize).then((data) => {
      setBooks(data);
    });
  }, [page, pageSize, query, sort, addedBook, izdajKnjigu]);
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
          className="my-5 mx-2 d-flex justify-content-between"
          style={{ marginBottom: "1rem !important" }}
        >
          <h1>
            <strong>Knjige</strong>
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
        <div id="books" className="mx-2">
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
              placeholder="Pretraži..."
              ref={searchRef}
            />
          </section>
          <section
            id="books-header"
            className="d-flex mt-4 justify-content-between"
          >
            <h3>
              <strong>Sve knjige</strong>
            </h3>
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <Dropdown className="ms-2">
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
                      active={activeSort === 3}
                      onClick={() => {
                        setActiveSort(3);
                        setSort("naziv_desc");
                      }}
                      eventKey="2"
                    >
                      Naziv <img alt="" src={downIcon} />
                    </Dropdown.Item>

                    <Dropdown.Item
                      active={activeSort === 6}
                      onClick={() => {
                        setActiveSort(6);
                        setSort("godina_desc");
                      }}
                      eventKey="4"
                    >
                      Godina izdavanja <img alt="" src={downIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 2}
                      onClick={() => {
                        setActiveSort(2);
                        setSort("naziv");
                      }}
                      eventKey="2"
                    >
                      Naziv <img alt="" src={upIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 7}
                      onClick={() => {
                        setActiveSort(7);
                        setSort("godina");
                      }}
                      eventKey="5"
                    >
                      Godina izdavanja <img alt="" src={upIcon} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex ms-4 align-items-center">
                <Button
                  onClick={() => {
                    setModalAddShow(true);
                  }}
                >
                  <Image src={addIcon} alt="sort icon" />
                  <span className="ms-2">Dodaj</span>
                </Button>
              </div>
            </div>
          </section>
          <section id="books-pagination">
            <table className="w-100 mt-5 book-table">
              <thead
                style={{
                  borderBottom: "2px solid #0004",
                }}
              >
                <tr className="m-5">
                  <th className="p-2" style={{ width: "150px" }}>
                    Naziv knjige
                  </th>
                  <th style={{ width: "150px" }} className="p-2">
                    Autor
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Izdavač
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Dostupno
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Godina izdavanja
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Opis
                  </th>
                  <th style={{ width: "50px" }} className="p-2"></th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "13px",
                  fontFamily: "Roboto",
                  color: "#0000008A",
                }}
              >
                {books !== null && books.data.length > 0 ? (
                  books.data.map((book) => (
                    <tr
                      className="book-row"
                      style={{ maxHeight: "100px" }}
                      key={book.id}
                    >
                      <td>
                        <div
                          className="p-2 w-100 h-100 d-flex align-items-center"
                          style={{ textAlign: "center" }}
                        >
                          <figure
                            style={{
                              marginBottom: "0px",
                              marginRight: "1em",
                            }}
                          >
                            <Image
                              style={{
                                borderRadius: "50px",
                              }}
                              height="30"
                              width="30"
                              src={book.imageUrl}
                              alt=""
                            />
                          </figure>

                          {HiglightTExt(book.naziv, query)}
                        </div>
                      </td>
                      <td className="p-2">
                        {HiglightTExt(
                          book.autor.ime + " " + book.autor.prezime,
                          query
                        )}
                      </td>
                      <td className="p-2">
                        {HiglightTExt(book.izdavac.naziv, query)}
                      </td>
                      <td className="p-2">{book.dostupno}</td>
                      <td className="p-2">{book.godinaIzdavanja}</td>
                      <td className="p-2">
                        <span
                          title={book.opis}
                          style={{
                            overflow: "hidden",
                            maxHeight: "70px",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span>{book.opis}</span>
                        </span>
                      </td>
                      <td className="p-2" align="right">
                        <Dropdown drop="left">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                            dots={true}
                          >
                            <img src={moreIcon} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setBookForEdit(book);
                                setModalEditShow(true);
                              }}
                              eventKey="1"
                            >
                              Uredi
                            </Dropdown.Item>

                            <Dropdown.Item
                              eventKey="3"
                              onClick={() => {
                                setIzdajKnjigu(book);
                                setModalIzdajShow(true);
                              }}
                            >
                              Izdaj
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Trenutno nema knjiga</td>
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
                  {pageSize * page < books?.count
                    ? pageSize * page
                    : books?.count}{" "}
                  od {books?.count} &nbsp;&nbsp;{" "}
                </span>
                <Button
                  variant="light"
                  className="p-0"
                  disabled={books?.previous ? false : true}
                  onClick={() => {
                    setPage((page) => page - 1);
                  }}
                >
                  <img src={leftArrow} alt="" />
                </Button>{" "}
                <Button
                  disabled={books?.next ? false : true}
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
      <AddBookModal
        setAddedBook={setAddedBook}
        show={modalAddShow}
        onHide={() => {
          setAddedBook(null);
          setModalAddShow(false);
        }}
      />
      <EditBookModal
        setAddedBook={setAddedBook}
        show={modalEditShow}
        onHide={() => {
          setBookForEdit(null);
          setModalEditShow(false);
          setAddedBook(null);
        }}
        book={bookForEdit}
      />
      <IzdajBookModal
        book={izdajKnjigu}
        show={modalIzdajShow}
        onHide={() => {
          setIzdajKnjigu(null);
          setModalIzdajShow(false);
        }}
      />
    </div>
  );
}
