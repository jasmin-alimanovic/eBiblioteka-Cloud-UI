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
import personIcon from "../assets/img/person.svg";
import leftArrow from "../assets/img/left-arrow.svg";
import rightArrow from "../assets/img/right-arrow.svg";
import moreIcon from "../assets/img/more.svg";

//
export default function Books() {
  const { currentUser } = useAuth();
  const [modalAddShow, setModalAddShow] = useState(false);
  const [activeSort, setActiveSort] = useState(1);
  const [books, setBooks] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("id_desc");
  const [addedBook, setAddedBook] = useState({});

  const searchRef = useRef("");

  //function that handles submit of search field
  function handleSubmit() {
    setQuery(searchRef.current.value);
  }
  useEffect(() => {
    getbooks(sort, query, page, pageSize).then((data) => {
      setBooks(data);
    });
  }, [page, pageSize, query, sort, addedBook]);
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
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
      <span style={{ color: "black" }}>&#x25bc;</span>
    </span>
  ));

  return (
    <div className="d-flex w-100">
      <MenuComponent />
      <main role="main" id="main" className="w-100">
        <section
          className="m-5 d-flex justify-content-between"
          style={{ marginBottom: "1rem !important" }}
        >
          <h1>
            <strong>Knjige</strong>
          </h1>
          <div className="user-detail">
            <span>
              | {currentUser?.ime}&nbsp; {currentUser?.prezime}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              <img src={personIcon} alt="person icon" />
            </span>
          </div>
        </section>
        <div id="books" className="mx-5">
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
              className="ps-5"
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
                      Najnovije postavljeno
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 2}
                      onClick={() => {
                        setActiveSort(2);
                        setSort("naziv");
                      }}
                      eventKey="2"
                    >
                      Naziv
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      active={activeSort === 3}
                      onClick={() => {
                        setActiveSort(3);
                        setSort("autor");
                      }}
                    >
                      Autor
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 4}
                      onClick={() => {
                        setActiveSort(4);
                        setSort("cijena");
                      }}
                      eventKey="4"
                    >
                      Cijena
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 5}
                      onClick={() => {
                        setActiveSort(5);
                        setSort("godina");
                      }}
                      eventKey="5"
                    >
                      Godina izdavanja
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
            <table className="w-100 mt-5">
              <thead style={{ borderBottom: "2px solid #0004" }}>
                <tr className="m-5">
                  <th className="p-2">Naziv knjige</th>
                  <th className="p-2">Autor</th>
                  <th className="p-2">Izdavač</th>
                  <th className="p-2">Dostupno</th>
                  <th className="p-2">Godina izdavanja</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {books ? (
                  books.data.map((book) => (
                    <tr key={book.id}>
                      <td className="p-2">
                        <Image
                          height="50"
                          width="50"
                          src={book.imageUrl}
                          alt=""
                        />
                        {book.naziv}
                      </td>
                      <td className="p-2">
                        {book.autor.ime + " " + book.autor.prezime}
                      </td>
                      <td className="p-2">{book.izdavac.naziv}</td>
                      <td className="p-2">{book.dostupno}</td>
                      <td className="p-2">{book.godinaIzdavanja}</td>
                      <td className="p-2">
                        <img src={moreIcon} alt="" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Trenutno nema knjiga</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#9FA2B4",
                    }}
                    align="right"
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
                  </td>
                  <td colSpan="2" align="center">
                    {pageSize * (page - 1) + 1}-{pageSize * page} od{" "}
                    {books?.count} &nbsp;&nbsp;{" "}
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
                      variant="light"
                      className="p-0"
                    >
                      {" "}
                      <img src={rightArrow} alt="" />
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
      </main>
      <AddBookModal
        setAddedBook={setAddedBook}
        show={modalAddShow}
        onHide={() => setModalAddShow(false)}
      />
    </div>
  );
}
