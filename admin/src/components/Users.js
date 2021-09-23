import React, { useRef, useState, useEffect } from "react";
import { Form, Image, Dropdown, Button } from "react-bootstrap";

//local imports
import searchIcon from "../assets/img/search.svg";
import addIcon from "../assets/img/add.svg";
import sortIcon from "../assets/img/sort.svg";
import MenuComponent from "./Menu";
import { useAuth } from "../contexts/AuthContext";
import leftArrow from "../assets/img/left-arrow.svg";
import rightArrow from "../assets/img/right-arrow.svg";
import moreIcon from "../assets/img/more.svg";
import upIcon from "../assets/img/sort-up.svg";
import downIcon from "../assets/img/sort-down.svg";
import IzdajBookModal from "./modals/IzdajBookModal";
import { getUsers } from "../services/userService";
import AddUserModal from "./modals/AddUserModal";
import EditUserModal from "./modals/EditUserModal";

//
export default function Users() {
  const { currentUser } = useAuth();
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [activeSort, setActiveSort] = useState(1);
  const [users, setUsers] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("id_desc");
  const [addedUser, setAddedUser] = useState(null);
  const [userForEdit, setUserForEdit] = useState(null);
  const [izdajKnjigu, setIzdajKnjigu] = useState(null);
  const [modalIzdajShow, setModalIzdajShow] = useState(false);

  const searchRef = useRef("");

  //function that handles submit of search field
  function handleSubmit() {
    setQuery(searchRef.current.value);
  }
  useEffect(() => {
    document.title = "eBiblioteka Cloud-Korisnici";
  }, []);
  useEffect(() => {
    getUsers(sort, query, page, pageSize).then((data) => {
      setUsers(data);
    });
  }, [page, pageSize, query, sort, addedUser]);
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
            <strong>Korisnici</strong>
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
              placeholder="Pretraži po imenu, email-u, korisničkom imenu ili korisničkom ID-u"
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
                <strong>Svi korisnici</strong>
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
                      active={activeSort === 2}
                      onClick={() => {
                        setActiveSort(2);
                        setSort("prezime");
                      }}
                      eventKey="2"
                    >
                      Prezime <img alt="" src={upIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 3}
                      onClick={() => {
                        setActiveSort(3);
                        setSort("prezime_desc");
                      }}
                      eventKey="2"
                    >
                      Prezime <img alt="" src={downIcon} />
                    </Dropdown.Item>

                    <Dropdown.Item
                      active={activeSort === 6}
                      onClick={() => {
                        setActiveSort(6);
                        setSort("datum_desc");
                      }}
                      eventKey="4"
                    >
                      Datum uclanjenja <img alt="" src={downIcon} />
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={activeSort === 7}
                      onClick={() => {
                        setActiveSort(7);
                        setSort("datum");
                      }}
                      eventKey="5"
                    >
                      Datum uclanjenja <img alt="" src={upIcon} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  style={{
                    marginTop: "1rem",
                    marginLeft: "3rem",
                    borderRadius: "7px",
                  }}
                  onClick={() => {
                    setModalAddShow(true);
                  }}
                >
                  <Image src={addIcon} alt="sort icon" />
                  <span className="ms-2">Dodaj</span>
                </Button>
              </div>
            </section>
            <table className="book-table mt-5 justify-self-center">
              <thead
                style={{
                  borderBottom: "2px solid #0004",
                }}
              >
                <tr className="m-5 book-row">
                  <th style={{ width: "150px" }} className="px-3">
                    Ime i prezime
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Korisničko ime
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Email
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Telefon
                  </th>
                  <th style={{ width: "100px" }} className="p-2">
                    Adresa
                  </th>
                  <th style={{ width: "150px" }} className="ps-2">
                    Datum učlanjenja
                  </th>
                  <th className="p-2" style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "13px",
                  fontFamily: "Roboto",
                  color: "#0000008A",
                }}
              >
                {users !== null && users.data.length > 0 ? (
                  users.data.map((user) => (
                    <tr className="book-row" key={user.id}>
                      <td className="p-2">
                        <div
                          className="p-1 w-100 h-100 d-flex align-items-center"
                          style={{ textAlign: "center", paddingRight: "3rem" }}
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
                              src={`https://eu.ui-avatars.com/api/?name=${user.ime}+${user.prezime}&rounded=true&background=0af`}
                              alt=""
                            />
                          </figure>

                          <span title={user.ime + " " + user.prezime}>
                            {user.ime + " " + user.prezime}
                          </span>
                        </div>
                      </td>
                      <td className="p-2">{user.korisnickoIme}</td>
                      <td className="p-2">
                        <span title={user.email}>{user.email}</span>
                      </td>
                      <td className="p-2">{user.telefon}</td>
                      <td className="p-2">
                        <span title={user.adresa}>{user.adresa}</span>
                      </td>
                      <td className="p-2">
                        {new Date(user.datumUclanjenja).toLocaleDateString()}
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
                                setUserForEdit(user);
                                setModalEditShow(true);
                              }}
                              eventKey="1"
                            >
                              Uredi
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
                  {pageSize * page < users?.count
                    ? pageSize * page
                    : users?.count}{" "}
                  od {users?.count} &nbsp;&nbsp;{" "}
                </span>
                <Button
                  variant="light"
                  className="p-0"
                  disabled={users?.previous ? false : true}
                  onClick={() => {
                    setPage((page) => page - 1);
                  }}
                >
                  <img src={leftArrow} alt="" />
                </Button>{" "}
                <Button
                  disabled={users?.next ? false : true}
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
      <AddUserModal
        setAddedUser={setAddedUser}
        show={modalAddShow}
        onHide={() => {
          setAddedUser(null);
          setModalAddShow(false);
        }}
      />
      <EditUserModal
        setAddedUser={setAddedUser}
        show={modalEditShow}
        onHide={() => {
          setUserForEdit(null);
          setModalEditShow(false);
          setAddedUser(null);
        }}
        user={userForEdit}
      />
      <IzdajBookModal
        user={izdajKnjigu}
        show={modalIzdajShow}
        onHide={() => {
          setIzdajKnjigu(null);
          setModalIzdajShow(false);
        }}
      />
    </div>
  );
}
